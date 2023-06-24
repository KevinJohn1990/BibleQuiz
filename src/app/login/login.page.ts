import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../utils/shared.scss'],
})
export class LoginPage implements OnInit {
  title = 'Admin/Maintainer Login';
  loginForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {}

  getFormValidationErrors() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.loginForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log('Key control: ' + key);
          console.log('keyError: ' + keyError);
          console.log('err value: ' + controlErrors[keyError]);
          console.log('___________________');
        });
      }
    });
  }

  tryLogin(form) {
    let value = form.value;
    console.log(this.loginForm.valid);
    if (!this.loginForm.valid) {
      this.getFormValidationErrors();
      return;
    }

    console.log(value);
    this.authService.doLogin(value).then(
      (res) => {
        console.log(res);

        this.router.navigate(['/home']);
        this.errorMessage = '';
        this.successMessage = 'Login successful';
      },
      (err) => {
        console.log(err);
        let errMsg = '';
        if (environment.production) {
          errMsg = 'Un-authorized';
        } else {
          errMsg = err.message;
        }
        this.errorMessage = 'Login failed: ' + errMsg;
        this.successMessage = '';
      }
    );
  }
}
