import { Component, OnInit, ViewChild } from '@angular/core';
import { WordPair } from '../../models/WordPair';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DataHandlerService } from '../../services/data-handler.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css'],
})
export class CreationComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  protected displayedColumns: string[] = ['german', 'english', 'amountOfRightAnswers', 'amountOfWrongAnswers', 'actions'];

  private internalWordPairData: WordPair[] = [];
  dataSource = new ExampleDataSource(this.internalWordPairData);

  constructor(
    private wordPairDialog: MatDialog,
    private dataHandlerService: DataHandlerService
  ) { }

  ngOnInit(): void {
    this.internalWordPairData = this.dataHandlerService.getGlobalTestWordPairList();
    this.dataSource.setData(this.internalWordPairData);
  }

  openDialog(isAddingNewWord: boolean, wordPair?: WordPair) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px',
    dialogConfig.height = '310px',
    dialogConfig.data = {
      isAddingNewWordPair: isAddingNewWord, 
      wordPair: wordPair
    }
    const dialogRef = this.wordPairDialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((result: {wordPair: WordPair, isAddingNewWordPair: boolean}) => {
        if (result.wordPair && result.isAddingNewWordPair) {
          this.internalWordPairData = [...this.internalWordPairData, result.wordPair]
          this.setTestData();
        } else if (result.wordPair && !result.isAddingNewWordPair) {
          this.internalWordPairData = this.internalWordPairData.map(wp => wp.id !== result.wordPair.id ? wp : result.wordPair)
          this.setTestData();
        } else {
          console.log('Dialog was cancelled')
        }
      })
  }

  private setTestData(): void{
    this.dataSource.setData(this.internalWordPairData);
    this.dataHandlerService.setGlobalTestWordPairList(this.internalWordPairData);
  }

  deleteRow(wordPair: WordPair): void {
    this.internalWordPairData = this.internalWordPairData.filter(wp => wp.id !== wordPair.id)
    this.setTestData();
  }

  sortByEnglish(): void {
    this.internalWordPairData.sort((a, b) => (a.english > b.english) ? 1 : -1)
    this.dataSource.setData(this.internalWordPairData)
  }

  sortByGerman(): void {
    this.internalWordPairData.sort((a, b) => (a.german > b.german) ? 1 : -1)
    this.dataSource.setData(this.internalWordPairData)
  }

  loadTestData(): void {
    this.resetData();
    this.loadInitialTestData();
  }

  resetData(): void {
    this.internalWordPairData = [];
    this.setTestData();
  }

  private loadInitialTestData(): void {
    this.dataHandlerService.getDemoWordPairs()
      .subscribe({
        next: (demoWordPairs) => {
          this.internalWordPairData = demoWordPairs;
          this.setTestData();
          // handle success message
        }, error: (error) => {
          console.error(error);
          this.internalWordPairData = [];
          // handle error message
        }
      });
  }
}

class ExampleDataSource extends DataSource<WordPair> {
  private _dataStream = new ReplaySubject<WordPair[]>();

  constructor(initialData: WordPair[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<WordPair[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: WordPair[]) {

    this._dataStream.next(data);
  }
}
