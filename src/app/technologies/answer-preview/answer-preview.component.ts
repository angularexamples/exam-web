import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-preview',
  templateUrl: './answer-preview.component.html',
  styleUrls: ['./answer-preview.component.css']
})
export class AnswerPreviewComponent implements OnInit {

  private currentUser: any;
  public examResults: any;
  public totalQns: number;
  public correctAns: number = 0;
  public userId : any;

  constructor(private _quizApi: QuizService,
    private _router: Router) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userId =  this.currentUser.user.userid
    }

  ngOnInit() {
    let data = { 'userId': this.userId , 'testId': 1 }
    this._quizApi.getExamResults$(data).subscribe(data => {
      if (data['success']) {
        this.examResults = data['data'];
        this.examResults.forEach(val => {
          val.question.question_options.forEach(option => {
            if ((val.answer_id == option.id) && (option.is_correct == true)) {
              this.correctAns++;
            }
          });
        });
        this.totalQns = this.examResults.length;
      }
    });
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

}
