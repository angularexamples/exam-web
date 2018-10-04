import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questions : any;
  public timeLeft: number ;
  private interval : any;
  private topicId : number;
  constructor(private _quizApi : QuizService,
    private _route:ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.topicId = params['id'];
    })
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
    this._quizApi.getQuestions$(this.topicId).subscribe(data => {
      if (data['success']) {
        this.questions = data['questions'];
        console.log(this.questions)
      } else { }
    });
  }

}
