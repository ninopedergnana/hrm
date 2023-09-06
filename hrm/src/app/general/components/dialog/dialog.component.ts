import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WordPair } from '../../models/WordPair';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {

  wordPairForm: FormGroup;
  internalWordPair: WordPair;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data?: WordPair) {
    this.wordPairForm = this.fb.group({
      english: new FormControl<string>('', Validators.required),
      german: new FormControl<string>('', Validators.required),
    })
  }

  createNewWordPair(): void {
    this.internalWordPair = {
      id: 1,
      english: this.wordPairForm.controls['english'].value,
      german: this.wordPairForm.controls['german'].value,
      answeredCorrectly: true,
      amountOfRightAnswers: 0,
      amountOfWrongAnswers: 0
    }
  }


}