import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
                });
    }
}