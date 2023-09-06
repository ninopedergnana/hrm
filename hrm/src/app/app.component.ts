import { Component, OnInit } from '@angular/core';
import { WordComparisonService } from './general/services/word-comparison.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hrm';
  isTestingMode: boolean;

  constructor(private wordComparisonService: WordComparisonService) {
  }

  ngOnInit(): void {
    this.wordComparisonService.testingMode$
    .subscribe((isTesting) => {
      this.isTestingMode = isTesting;
    });
  }

  
}
