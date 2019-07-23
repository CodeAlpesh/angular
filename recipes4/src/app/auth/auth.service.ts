import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponse {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(userEmail:string, userPassword:string) {
        return this.http.
            post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5iXF96fwKcmLDaTMdUIbEsra09ZOOng0',
                {
                    email: userEmail,
                    password: userPassword,
                    returnSecureToken: true
                }
            ).pipe(
                catchError((errorResponse)=> {
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
                      }
                    }
    
                    return throwError(error);
                })
            );
    }
}