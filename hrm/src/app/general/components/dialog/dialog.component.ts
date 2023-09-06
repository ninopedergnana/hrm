import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WordPair } from '../../models/WordPair';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface InternalDialogData {
  isAddingNewWordPair: boolean,
  wordPair: WordPair
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  wordPairForm: FormGroup;
  internalWordPair: WordPair;
  internalDialogData: InternalDialogData;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: InternalDialogData
  ) {
    this.internalDialogData = data;
    this.wordPairForm = this.fb.group({
      english: new FormControl<string>('', Validators.required),
      german: new FormControl<string>('', Validators.required),
    })
  }

  ngOnInit(): void {

    if (this.internalDialogData.wordPair && !this.internalDialogData.isAddingNewWordPair) {

      this.internalWordPair = this.internalDialogData.wordPair;
      this.wordPairForm.controls['english'].patchValue(this.internalWordPair.english);
      this.wordPairForm.controls['german'].patchValue(this.internalWordPair.german);
    }
  }

  createNewWordPair(): void {
    if (this.internalDialogData.isAddingNewWordPair) {
      this.internalWordPair = {
        id: this.generateRandomId(),
        english: this.wordPairForm.controls['english'].value,
        german: this.wordPairForm.controls['german'].value,
        answeredCorrectly: true,
        amountOfRightAnswers: 0,
        amountOfWrongAnswers: 0
      }
    } else {
      this.internalWordPair = {
        ...this.internalWordPair,
        english: this.wordPairForm.controls['english'].value,
        german: this.wordPairForm.controls['german'].value,
      }
    }
    this.dialogRef.close({ wordPair: this.internalWordPair, isAddingNewWordPair: this.internalDialogData.isAddingNewWordPair });
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  private generateRandomId(): number {
    let result = 0;
    for (let i = 0; i < 16; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      result = result * 10 + randomDigit;
    }
    return result;
  }
}
