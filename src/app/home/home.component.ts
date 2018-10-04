import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentUser : any;

  constructor(private _router: Router,
    private _spinner: NgxSpinnerService,
    public toastr: ToastrManager) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
     /** spinner starts on init */
     this._spinner.show();
 
     setTimeout(() => {
         /** spinner ends after 5 seconds */
         this._spinner.hide();
     }, 500);
   
  }

  public startTest() {
     if(this.currentUser) {
        this._router.navigate(['/technologies/courses'])
     }else {
        this.toastr.infoToastr('Please Login','Info',{
          position : 'top-center'
        })
     }
  }
}
