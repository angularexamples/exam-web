import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinglteonService } from '../../services/singlteon.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  private id: any;
  public topics: any;

  constructor(private _route: ActivatedRoute,
    private _quizApi: QuizService,
    private _singleteonApi: SinglteonService) { }

  ngOnInit() {
    this.id = localStorage.getItem('id')
    this._quizApi.getTopics$(this.id).subscribe(data => {
      if (data['success']) {
        this.topics = data['chapters'];
      } else { }
    });

  }

}
