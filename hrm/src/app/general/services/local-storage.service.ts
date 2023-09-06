import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // POC

  // public get wordpairs(): WordPair[] {
  // return JSON.parse(localStorage.getItem('wordpairs'));
  // }

  public set setWordpairs(wordPairs: WordPair[]) {
    localStorage.setItem('wordpairs', JSON.stringify(wordPairs));
  }


}
