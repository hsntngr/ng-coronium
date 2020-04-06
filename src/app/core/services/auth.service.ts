import { BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import * as moment from 'moment';
import { AuthModel } from '@core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  public static VALIDATION_FAILED = 422;
  public token: string;
  public authState = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<AuthModel>(null);
  private userReady: AuthModel;
  private autoLogoutTimer: NodeJS.Timeout;

  attemptToLogin(credentials: { email: string, password: string, remember_me: boolean }) {
    return this.http.post(environment.apiUrl + '/login', credentials)
      .pipe(catchError(err => {
        switch (err.status) {
          case AuthService.VALIDATION_FAILED:
            const errorGroups: string[][] = Object.values(err.error.errors);
            const errors = [];
            for (const error of errorGroups) {
              error.forEach(e => errors.push(e));
            }
            return throwError({ status: err.status, error: errors });
        }

        return throwError({ status: err.status, error: err.error });
      }));
  }

  login(user: AuthModel) {
    this.user.next(user);
    this.token = user.token;
    this.userReady = user;
    this.authState.next(true);
    this.localStorageService.set('authUser', user);
    this.autoLogout();
  }

  private autoLogin() {
    const user = this.localStorageService.get<AuthModel>('authUser');

    if (user) {
      if (user.expiresAt - moment().unix() <= 0) {
        this.localStorageService.unset('authUser');
        return;
      }

      this.user.next(user);
      this.token = user.token;
      this.userReady = user;
      this.authState.next(true);
    }
  }

  private autoLogout() {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }

    if (!this.userReady) {
      return;
    }

    this.autoLogoutTimer = setTimeout(() => {
      this.user.next(null);
      this.userReady = null;
      this.authState.next(null);
      this.localStorageService.unset('authUser');
    }, this.userReady.expiresAt - moment().unix() * 1000);
  }

  initiate() {
    this.autoLogin();
    this.autoLogout();
  }
}
