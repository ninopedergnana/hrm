import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningComponent } from './general/learning/learning/learning.component';
import { CreationComponent } from './general/creation/creation/creation.component';
import { TestingComponent } from './general/testing/testing/testing.component';

const routes: Routes = [
  { path: 'learning', component: LearningComponent },
  { path: 'creation', component: CreationComponent },
  { path: 'testing', component: TestingComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
