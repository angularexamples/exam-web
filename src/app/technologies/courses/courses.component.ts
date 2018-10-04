import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SinglteonService } from '../../services/singlteon.service';
import { QuizService } from '../../services/quiz.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public courses : any;

  constructor(private _quizApi : QuizService,
    private _router : Router,
    private _singleteonApi : SinglteonService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit() {
    this._spinner.show();
    this._quizApi.getCourses$().subscribe(data => {
      if (data['success']) {
        this.courses = data['courses'];
        this._spinner.hide();
        console.log(this.courses)
      } else { }
    });
  }

  topic(courseId:any) {
    localStorage.setItem('id',courseId)
    this._singleteonApi.setVal(courseId);
    this._router.navigate(['/technologies/topics']);
  }
}
