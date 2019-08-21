import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {

    form:FormGroup;
    errors:string[] = [];
    passwordValidationErrorCodes = {
        'min' : 'Minimum length is  8 characters.', 
        'uppercase' : 'Must have atleast one uppercase letter.', 
        'digits' : 'Must have atleast one digit.'
    }

    constructor(private fb: FormBuilder, 
                private authService: AuthService,
                private router: Router) {

        this.form = this.fb.group({
            email: ['test@gmail.com',Validators.required],
            password: ['Password10',Validators.required],
            confirm: ['Password10',Validators.required]
        });


    }

    ngOnInit() {

    }


    signUp() {
        const val = this.form.value;

        if(val.email && val.password && val.password === val.confirm) {
            this.authService.signup(val.email, val.password).subscribe(
                (user) => {
                    console.log('User Created:' + user);
                    this.router.navigate(['/']);
                },
                (errorResponse) => {
                    console.log(errorResponse);
                    this.errors = errorResponse.error.error;
                }
            )
        }
    }

}
