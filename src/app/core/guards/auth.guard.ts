import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.authState.pipe(
      take(1),
      map(loggedIn => {
        if (loggedIn) {
          return true;
        }
        return this.router.createUrlTree(['/admin/login']);
      }),
    );
  }
}
