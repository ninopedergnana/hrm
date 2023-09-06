import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordComparisonService {

  properties = ["english", "german"];
  internalIsTestingMode: boolean = false;

  constructor() { }

  getRandomTranslation(): { questionLanguage: string, answerLanguage: string } {
    this.properties.sort(() => Math.random() - 0.5); // works for small arrays, otherwise use something like fisher-yates
    const questionLanguage = this.properties[0];
    const answerLanguage = this.properties[1];
    return {questionLanguage, answerLanguage};
  }

  private testingMode = new BehaviorSubject<boolean>(false);
  testingMode$ = this.testingMode.asObservable();

  setData(data: boolean) {
    this.testingMode.next(data);
  }

}
