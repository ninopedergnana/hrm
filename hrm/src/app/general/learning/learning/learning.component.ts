import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { WordPair } from '../../models/WordPair';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WordComparisonService } from '../../services/word-comparison.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  questionWord: WordPair;
  questionLanguages: { questionLanguage: string, answerLanguage: string }
  questionLanguageWord = "";
  answerLanguageWord = "";
  questionForm: FormGroup;
  trainingHasStarted: boolean;
  answerIsFalse: boolean;
  isNextButtonDisabled: boolean = true;
  private completeInternalLearningData: WordPair[] = [];
  private incorrectInternalLearningData: WordPair[] = [];
  

  constructor(
    private dataHandlerService: DataHandlerService,
    private fb: FormBuilder,
    private wordComparisonService: WordComparisonService
    ) {
      this.questionForm = this.fb.group({
        wordControl: new FormControl<string>('', Validators.required)
      })
    }


  ngOnInit(): void {
    this.completeInternalLearningData = this.dataHandlerService.getGlobalTestWordPairList();
  }

  startTraining(): void {
    this.trainingHasStarted = true;
    this.incorrectInternalLearningData = [...this.completeInternalLearningData];
    this.setRandomQuestionWord();
  }

  checkAnswer(): void {
    const writtenAnswer = this.questionForm.controls['wordControl'].value;
     if (writtenAnswer === this.questionWord[this.questionLanguages.questionLanguage as keyof typeof this.questionWord]) {
      this.handleCorrectfullAnswer();
     } else {
      this.handleWrongAnswer();
     }
  }

  private handleWrongAnswer() {
    console.log(this.incorrectInternalLearningData, 'before');

    this.incorrectInternalLearningData = [...this.incorrectInternalLearningData, this.questionWord];
    this.answerIsFalse = true;
    this.isNextButtonDisabled = true;
    console.log(this.incorrectInternalLearningData, 'after');
    
  }

  private handleCorrectfullAnswer() {
    console.log(this.incorrectInternalLearningData, 'before r');

    const indexToRemove = this.incorrectInternalLearningData.findIndex(wp => wp.id === this.questionWord.id);
    if (indexToRemove !== -1) {
      this.incorrectInternalLearningData.splice(indexToRemove, 1);      
    }
    console.log(this.incorrectInternalLearningData, 'after r');

    this.answerIsFalse = false;
    this.isNextButtonDisabled = false;
  }

  setRandomQuestionWord(): void {
    if (this.incorrectInternalLearningData?.length !== 0) {
      this.isNextButtonDisabled = true;
      this.questionForm.controls['wordControl'].patchValue('');
      this.questionLanguages = this.wordComparisonService.getRandomTranslation();
      const randomStartNumber = this.getRandomNumber(this.incorrectInternalLearningData.length);
      this.questionWord = this.incorrectInternalLearningData[randomStartNumber];
      this.questionLanguageWord = this.questionWord[this.questionLanguages.answerLanguage as keyof typeof this.questionWord] as string;
      this.answerLanguageWord = this.questionWord[this.questionLanguages.questionLanguage as keyof typeof this.questionWord] as string;
    } else {
      this.trainingHasStarted = false;
    }
  }

  getRandomNumber(maximum: number): number {
    return Math.floor(Math.random() * maximum);
  }


}
