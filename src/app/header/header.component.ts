import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider,
} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser: any;

  constructor(private socialAuthService: AuthService,
    private _router : Router,
    public toastr: ToastrManager) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public socialSignIn(socialPlatform: string) {

    let socialPlatformProvider;

    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...
      }
    );
  }

  ngOnInit() {

  }
  public technologies() {
    if(this.currentUser) {
      this._router.navigate(['/technologies/courses'])
   }else {
    this.toastr.infoToastr('Please Login','Info!',{
      position : 'top-center'
    })
   }
  }
}
