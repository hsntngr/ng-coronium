import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { AuthModel } from '@core/models/auth.model';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationErrors: { [key: string]: string }[];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      remember_me: new FormControl(true),
    });
  }

  onSubmit() {
    this.authService.attemptToLogin(this.loginForm.value)
      .subscribe(
        (user: { access_token: string, expires_in: number }) => {
          const auth: AuthModel = {
            token: user.access_token,
            expiresAt: moment().unix() + user.expires_in,
          };
          this.authService.login(auth);
          this.router.navigate(['/admin/dashboard']);
        },
        (err: { status: number, error: any }) => {
          switch (err.status) {
            case AuthService.VALIDATION_FAILED:
              this.validationErrors = err.error;
              break;
          }
        },
      );
  }
}
