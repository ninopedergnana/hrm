import { Component, OnInit, ViewChild } from '@angular/core';
import { WordPair } from '../../models/WordPair';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
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
  protected displayedColumns: string[] = ['id', 'german', 'english', 'amountOfRightAnswers', 'amountOfWrongAnswers'];

  private initialWordPairData: WordPair[] = [];
  private internalWordPairData: WordPair[] = [];
  dataSource = new ExampleDataSource(this.initialWordPairData);


  constructor(
    private wordPairDialog: MatDialog, 
    private dataHandlerService: DataHandlerService
    ) {}

  ngOnInit(): void {
    this.loadInitialTestData
  }

  openDialog() {
    this.wordPairDialog.open(DialogComponent, {
      data: null,
      width: '600px',
      height: '300px',
    });
  }

  loadTestData(): void {
    this.dataSource.setData(this.initialWordPairData);
  }

  private loadInitialTestData(): void {
    this.dataHandlerService.getWordPairs()
    .subscribe({
      next: (wordPairs) => {
        this.initialWordPairData = wordPairs;
        // handle success message
      }, error: (error) => {
        console.error(error);
        this.initialWordPairData = [];
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

  disconnect() {}

  setData(data: WordPair[]) {
    this._dataStream.next(data);
  }
}
