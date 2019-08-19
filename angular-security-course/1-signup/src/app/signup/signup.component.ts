import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/auth.service';

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

    constructor(private fb: FormBuilder, private authService: AuthService) {

        this.form = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required],
            confirm: ['',Validators.required]
        });


    }

    ngOnInit() {

    }


    signUp() {
        const val = this.form.value;

        if(val.email && val.password && val.password === val.confirm) {
            this.authService.signup(val.email, val.password).subscribe(
                (user) => {
                    console.log(user);
                },
                (err) => {
                    console.log(err);
                    this.errors = err.error.error;
                    this.errors.forEach(err => {
                        console.log(err + ":" + this.passwordValidationErrorCodes[err])
                    })
                }
            )
        }
    }

}
