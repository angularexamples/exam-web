import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TechnologiesRoutingModule } from './technologies-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { TopicsComponent } from './topics/topics.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswerPreviewComponent } from './answer-preview/answer-preview.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    TechnologiesRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    CoursesComponent,
    TopicsComponent,
    QuizComponent,
    AnswerPreviewComponent,
    QuestionsComponent
  ]
})
export class TechnologiesModule { }
