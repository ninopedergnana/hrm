import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private jsonUrl = '../../assets/example-words.json'
  private demoWordPairs: WordPair[];
  protected globalTestWordPairList: WordPair[] = [];

  constructor(private http: HttpClient) { }

  getDemoWordPairs(): Observable<WordPair[]> {
    return this.http.get<WordPair[]>(this.jsonUrl).pipe(
      map((data) => {
        this.demoWordPairs = data;
        return this.demoWordPairs;
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

  getGlobalTestWordPairList(): WordPair[] {
    return this.globalTestWordPairList;
  }


}
