import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile, filter } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  private alive: boolean = true;
  private time_allocated: number = 30;
  private exam: any = [];
  private currentUser: any;
  public questions: any;
  private topicId: number;
  public selectedIndex: any;
  public selColor: any;
  public miliseconds: number;
  public userId : any;

  constructor(private _quizApi: QuizService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _spinner: NgxSpinnerService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId =  this.currentUser.user.userid
  }

  ngOnInit() {
    this._spinner.show();
    this._route.params.subscribe(params => {
      this.topicId = params['id'];
    });

    this.miliseconds = this.time_allocated * 60 * 1000;
    interval(1000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(x => {
        this.miliseconds -= 1000;
        if (this.miliseconds < 0) {
          this.miliseconds = 0;
          this.alive = false;
          window.alert("Times Up, Quiz Submitted");
          this.submitExam()
        }
      });

    this._quizApi.getQuestions$(this.topicId).subscribe(data => {
      if (data['success']) {
        this.questions = data['questions'];
        this._spinner.hide();
        this.questions.forEach(val => {
          this.exam.push({ 'question_id': val.id, 'answer_id': 0, user_id: this.userId, test_id: 1 });
        });
      } else { }
    });

  }

  public selected(qns: number, answerId: number) {
    this.selectedIndex = qns;
    let index = this.exam.findIndex(val => val.question_id == qns);
    this.exam.splice(index, 1)
    this.exam.push({ 'question_id': qns, 'answer_id': answerId, user_id: this.userId, test_id: 1 });
  }

  public submitExam() {
    console.log(this.exam)
    this._quizApi.saveExam$(this.exam).subscribe(data => {
      if (data['success']) {
        this._router.navigate(['technologies/answer-preview'])
      }
    })
  }

}
