import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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

    this.isLoading = true;
    if(this.isLoginMode) {

    } else {
      this.authService
        .signup(authForm.value.email, authForm.value.password)
        .subscribe(
          (response) => {
            console.log(response);
            this.isLoading = false;
            this.error = null;
          },
          (errorResponse) => {
            console.log(errorResponse);
            this.error = "Unknown error occured";

            if(errorResponse.error && errorResponse.error.error) {
              console.log(errorResponse.error.error.message);
              switch(errorResponse.error.error.message) {
                case "EMAIL_EXISTS":
                  this.error = "Email already registered. Try another one."
                  break;
                case "OPERATION_NOT_ALLOWED":
                  this.error = "Try other way of login." 
                  break;
              }
            } 
            this.isLoading = false;
          }
        )
    }
    authForm.reset();
  }

}
