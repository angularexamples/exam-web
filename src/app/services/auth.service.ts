import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ENV } from '../env.config';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public currentUser;

    constructor(public http: HttpClient,
        private router: Router) {
    }

    login(oUser) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(`${ENV.BASE_API}login`, JSON.stringify(oUser), { headers: headers })
            .pipe(
                tap((response: any) => {
                    if (response.success) {
                        this.currentUser = response.data;
                        let userObj: any = {};
                        userObj.user = response.data;
                        userObj.token = response.token;
                        localStorage.setItem('currentUser', JSON.stringify(userObj));
                    }
                    response;
                }),
                catchError(this.handleError)
            )
    }
    isLoggedIn(url, role): boolean {
        try {
            const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
            if (theUser && theUser.token) {
                this.tokenCheck(theUser.token).subscribe(data => {
                    if (data.success === false) {
                        this.router.navigate(['/auth/login']);
                    }
                    else {
                        if (theUser && (theUser.user.access_level === data.data.access_level)) {
                            this.currentUser = theUser.user;
                            if (role === data.data.access_level && (data.data.status === 'active'))
                                this.router.navigate([url]);
                            else if (data.data.access_level === 1) this.router.navigate(['/admin']);
                            else if (data.data.access_level === 2) this.router.navigate(['/client']);
                            else this.router.navigate(['/auth/login']);
                        }
                    }
                });
            }
            if (theUser && (theUser.user.access_level === role)) {
                this.currentUser = theUser.user;
            }
        } catch (e) {
            return false
        }
        return !!this.currentUser;
    }
    tokenCheck(token) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(`${ENV.BASE_API}checkuserlevel`, JSON.stringify({ token: token }), { headers: headers })
            .pipe(
                tap((response: any) => {
                    response;
                }),
                catchError(this.handleError)
            )
    }

    private handleError(error: Response) {
        return throwError(error.json() || 'Server error');
    }

    //logout event
    public logout(): void {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

}
