import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WordPair } from '../../models/WordPair';
import { MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

const testData: WordPair[] = [
  {
    id: 1,
    english: "car",
    german: "Auto",
    answeredCorrectly: true,
    amountOfRightAnswers: 0,
    amountOfWrongAnswers: 0
},
{
    id: 2,
    english: "house",
    german: "Haus",
    answeredCorrectly: true,
    amountOfRightAnswers: 0,
    amountOfWrongAnswers: 0
},
]

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css'],
  standalone: true,
  imports: [MatTableModule, MatSortModule],
})
export class CreationComponent implements OnInit {

  protected displayedColumns: string[] = ['id', 'german', 'english', 'amountOfRightAnswers', 'amountOfWrongAnswers'];
  dataSource: MatTableDataSource<WordPair>;

  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(testData)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
