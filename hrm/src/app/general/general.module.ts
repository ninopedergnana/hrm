import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationComponent } from './creation/creation/creation.component';
import { LearningComponent } from './learning/learning/learning.component';
import { TestingComponent } from './testing/testing/testing.component';



@NgModule({
  declarations: [
    CreationComponent,
    LearningComponent,
    TestingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GeneralModule { }
