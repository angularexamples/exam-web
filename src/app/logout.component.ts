import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
    template: ''
})

export class LogoutComponent implements OnInit {

    constructor(
        private _authService: AuthService,
        private _router: Router,
        public toastr : ToastrManager) {
    }

    ngOnInit() {
        this._authService.logout();
        this.toastr.successToastr('You have been logged out.', 'Success');
        this._router.navigate(['/home']);
    }

}