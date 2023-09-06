import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private jsonUrl = '../../assets/example-words.json'
  private wordPairs: WordPair[];
  private globalTestWordPairList: WordPair[];

  constructor(private http: HttpClient) { }

  getWordPairs(): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(this.jsonUrl).pipe(
      map((data) => {
        this.wordPairs = data;
        return this.wordPairs;
      }),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }


  setGlobalTestWordPairList(testWordPairs: WordPair[]): void {
    this.globalTestWordPairList = testWordPairs;
  }


}
