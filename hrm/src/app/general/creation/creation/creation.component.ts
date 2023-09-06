import { Component, OnInit, ViewChild } from '@angular/core';
import { WordPair } from '../../models/WordPair';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DataHandlerService } from '../../services/data-handler.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css'],
})
export class CreationComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  protected displayedColumns: string[] = ['german', 'english', 'actions'];

  private internalWordPairData: WordPair[] = [];
  dataSource = new ExampleDataSource([]);

  constructor(
    private wordPairDialog: MatDialog,
    private dataHandlerService: DataHandlerService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.internalWordPairData = this.dataHandlerService.getGlobalTestWordPairList();
    // sort by german by default
    this.internalWordPairData.sort((a, b) => (a.german.toLowerCase() > b.german.toLowerCase()) ? 1 : -1)
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

  private setTestData(): void {
    // sort by german by default
    this.internalWordPairData.sort((a, b) => (a.german.toLowerCase() > b.german.toLowerCase()) ? 1 : -1)
    this.dataSource.setData(this.internalWordPairData);
    this.dataHandlerService.setGlobalTestWordPairList(this.internalWordPairData);
  }

  deleteRow(wordPair: WordPair): void {
    this.internalWordPairData = this.internalWordPairData.filter(wp => wp.id !== wordPair.id)
    this.setTestData();
  }

  sortByEnglish(): void {
    this.internalWordPairData.sort((a, b) => (a.english.toLowerCase() > b.english.toLowerCase()) ? 1 : -1)
    this.dataSource.setData(this.internalWordPairData)
  }

  sortByGerman(): void {
    this.internalWordPairData.sort((a, b) => (a.german.toLowerCase() > b.german.toLowerCase()) ? 1 : -1)
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
        }, error: (error) => {
          console.error(error);
          this.internalWordPairData = [];
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
