import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

    constructor(private http: HttpClient) {}

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
                catchError(this.handleError)
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
                catchError(this.handleError)
            );
    }

    handleError(errorResponse: HttpErrorResponse) {
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