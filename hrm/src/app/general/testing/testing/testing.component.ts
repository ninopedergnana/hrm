import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { WordPair } from '../../models/WordPair';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WordComparisonService } from '../../services/word-comparison.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {

  questionWord: WordPair;
  questionLanguages: { questionLanguage: string, answerLanguage: string }
  questionLanguageWord = "";
  answerLanguageWord = "";
  questionForm: FormGroup;
  testingHasStarted: boolean;
  showStats: boolean;
  answeredCorrectly: number;
  percentage: number;
  answeredInCorrectly: number;
  private completeInternalTestingData: WordPair[] = [];
  private correctInternalLearningData: WordPair[] = [];
  private incorrectInternalTestingData: WordPair[] = [];
  

  constructor(
    private dataHandlerService: DataHandlerService,
    private fb: FormBuilder,
    private wordComparisonService: WordComparisonService,
    ) {
      this.questionForm = this.fb.group({
        wordControl: new FormControl<string>('', Validators.required)
      })
    }


  ngOnInit(): void {
    this.completeInternalTestingData = this.dataHandlerService.getGlobalTestWordPairList();
  }

  startTest(): void {
    this.wordComparisonService.setData(true);
    this.completeInternalTestingData = this.dataHandlerService.getGlobalTestWordPairList();
    this.showStats = false;
    this.testingHasStarted = true;
    this.incorrectInternalTestingData = [];
    this.correctInternalLearningData = []
    this.setRandomQuestionWord(true);
  }

  public showStatistics(): void {
    this.showStats = true;
    this.answeredCorrectly = this.correctInternalLearningData.length;
    this.answeredInCorrectly = this.incorrectInternalTestingData.length;
    const totalWords = this.answeredCorrectly + this.answeredInCorrectly;
    this.percentage = (this.answeredCorrectly / totalWords) * 100;
  }

  checkAnswer(): void {
    const writtenAnswer = this.questionForm.controls['wordControl'].value;
     if (writtenAnswer === this.questionWord[this.questionLanguages.questionLanguage as keyof typeof this.questionWord]) {
      this.handleCorrectfullAnswer();
     } else {
      this.handleWrongAnswer();
     }
     this.setRandomQuestionWord(false);
  }

  private handleWrongAnswer() {
    //remove from question set
    this.completeInternalTestingData = this.completeInternalTestingData.filter(wp => wp.id !== this.questionWord.id)
    //add to wrong answer set
    this.incorrectInternalTestingData = [...this.incorrectInternalTestingData, this.questionWord];
  }

  private handleCorrectfullAnswer() {
    //remove from question set
    this.completeInternalTestingData = this.completeInternalTestingData.filter(wp => wp.id !== this.questionWord.id)
    //add to right answer set
    this.correctInternalLearningData = [...this.correctInternalLearningData, this.questionWord];
  }

  setRandomQuestionWord(isInitialRandomWordCall: boolean): void {
    if (this.completeInternalTestingData?.length !== 0) {
      this.questionForm.controls['wordControl'].patchValue('');
      this.questionLanguages = this.wordComparisonService.getRandomTranslation();
      const randomStartNumber = this.getRandomNumber(this.completeInternalTestingData.length);
      this.questionWord = this.completeInternalTestingData[randomStartNumber];
      this.questionLanguageWord = this.questionWord[this.questionLanguages.answerLanguage as keyof typeof this.questionWord] as string;
      this.answerLanguageWord = this.questionWord[this.questionLanguages.questionLanguage as keyof typeof this.questionWord] as string;
    } else {
      if(!isInitialRandomWordCall) {
        this.showStatistics();
      }
      this.wordComparisonService.setData(false);
      this.testingHasStarted = false;
    }
  }

  getRandomNumber(maximum: number): number {
    return Math.floor(Math.random() * maximum);
  }

}
