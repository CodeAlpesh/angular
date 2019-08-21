import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../common/forms.css']
})
export class LoginComponent implements OnInit {

    form:FormGroup;
    error: string;

    constructor(private fb:FormBuilder, 
                private authService: AuthService,
                private router: Router) {

        this.form = this.fb.group({
            email: ['test@gmail.com',Validators.required],
            password: ['Password10',Validators.required]
        });

    }

    ngOnInit() {

    }


    login() {
        const formValue = this.form.value;
        if(formValue.email && formValue.password) {
            this.authService.signin(formValue.email, formValue.password).subscribe(
                () => { 
                    console.log('Signin successful.');
                    this.router.navigate(['/'])
                },
                (err) => { 
                    console.log('Error:' + err);
                    this.error = 'Authntication failed. Plz Conract support team.'
                }
            )
        }

    }

}
