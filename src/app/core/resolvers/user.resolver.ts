import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserModel> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    return this.userService.fetchUser(+route.params.id)
      .pipe(first());
  }
}
