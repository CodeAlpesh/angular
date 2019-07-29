import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponse {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    autoLogoutTimer = null;

    constructor(private http: HttpClient, private router: Router) {}

    signin(userEmail:string, userPassword:string) {
        return this.http
            .post<AuthResponse>(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5iXF96fwKcmLDaTMdUIbEsra09ZOOng0",
                {
                    email: userEmail,
                    password: userPassword,
                    returnSecureToken: true
                }
            ).
            pipe(
                catchError(this.handleError),
                tap(responseData => {
                    this.handleAuthResponse(responseData);
                })
                //The AuthResponse is still being sent to the subscriber. Override the returnvalue using map.
                // ,
                // map((data)=> {
                //   return of({auth: true})  
                // })
            );
    }

    signup(userEmail:string, userPassword:string) {
        return this.http.
            post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5iXF96fwKcmLDaTMdUIbEsra09ZOOng0',
                {
                    email: userEmail,
                    password: userPassword,
                    returnSecureToken: true
                }
            ).
            pipe(
                catchError(this.handleError),
                tap(responseData => {
                    this.handleAuthResponse(responseData);
                })
            );
    }

    signout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if(this.autoLogoutTimer) {
            clearTimeout(this.autoLogoutTimer);
        }
        this.autoLogoutTimer = null;
    }

    autoLogin() {

        // const helBoy = this.router.routerState.snapshot;
        // console.log(helBoy.url);
        // console.log(this.ar.snapshot);

        const userData: {
            email: string,
            userId: string,
            _authToken: string,
            _tokenExpiryDate: string    
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }

        const tokenExpiryDate = new Date(userData._tokenExpiryDate);
        const loadedUser = new User(
            userData.email, 
            userData.userId, 
            userData._authToken, 
            tokenExpiryDate);
        
        if(loadedUser.token) {
            this.user.next(loadedUser);
            // this.router.navigate(['/recipes']);
            const timeSeconds = tokenExpiryDate.getTime() - new Date().getTime(); 
            this.autoLogout(timeSeconds);
        }
        
    }

    autoLogout(expiryDurationMS: number) {
        console.log(expiryDurationMS);
        this.autoLogoutTimer = setTimeout(() => {
            this.signout();
        }, expiryDurationMS);
    }

    private handleAuthResponse(responseData: AuthResponse) {
        
        console.log(new Date().getTime() + "-" + (+responseData.expiresIn * 1000));
        const user = new User(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            new Date(new Date().getTime() + (+responseData.expiresIn * 1000))
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(+responseData.expiresIn * 1000);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let error = "Unknown error occured";

        if(errorResponse.error && errorResponse.error.error) {
          console.log(errorResponse.error.error.message);
          switch(errorResponse.error.error.message) {
            case "EMAIL_EXISTS":
              error = "Email already registered. Try another one."
              break;
            case "OPERATION_NOT_ALLOWED":
              error = "Try other way of login." 
              break;
            case "EMAIL_NOT_FOUND":
            case "INVALID_PASSWORD":
              error = "Login failed. Please check credentials."
              break;
          }
        }

        return throwError(error);
    }


}