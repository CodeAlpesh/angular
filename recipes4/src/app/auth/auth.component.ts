import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {

    if(!authForm.valid) {
      return;
    }

    let authResponse: Observable<AuthResponse> = null;
    this.isLoading = true;
    if(this.isLoginMode) {
      authResponse = this.authService.signin(authForm.value.email, authForm.value.password);
    } else {
      authResponse = this.authService
        .signup(authForm.value.email, authForm.value.password);
    }

    authResponse.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.error = null;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage; 
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

}