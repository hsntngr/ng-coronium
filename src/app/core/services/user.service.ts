import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { map, take } from 'rxjs/operators';
import { CountryService } from '@core/services/country.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private countryService: CountryService) {
  }

  page = 1;
  users: UserModel[] = [];
  usersCount = new BehaviorSubject(0);
  fetchUsersInitialized = false;
  userChannel = new BehaviorSubject<UserModel>(null);
  usersChannel = new BehaviorSubject<UserModel[]>(null);

  fetchUsers(page = 1) {
    if (this.fetchUsersInitialized && this.page === page) {
      return this.usersChannel;
    }
    this.page = page;
    this.fetchUsersInitialized = true;
    return this.http.get(environment.apiUrl + '/users?page=' + page)
      .pipe(take(1))
      .subscribe((res: { total: number, users: UserModel[] }) => {
        this.users = res.users;
        this.usersCount.next(res.total);
        this.usersChannel.next(this.users);
      });
  }

  storeUser(user) {
    return this.http.post(environment.apiUrl + '/users/store', user);
  }

  fetchUser(id: number): Observable<UserModel> {
    if (this.fetchUsersInitialized) {
      const user = this.users.find(u => u.id === id);
      if (user) {
        this.userChannel.next(user);
        return this.userChannel;
      }
    }

    return this.http.get<UserModel>(environment.apiUrl + '/users/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete<{ status: 'success' | 'error' }>(environment.apiUrl + '/users/' + id)
      .pipe(map((res: { status: 'success' | 'error' }) => {
        if (res.status === 'success') {
          this.users = this.users.filter(u => u.id !== id);
          this.usersChannel.next(this.users);
        }
        return res;
      }))
      .subscribe();
  }

  pushUser(user: UserModel) {
    if (this.fetchUsersInitialized) {
      this.users.push(user);
      this.usersChannel.next(this.users);
    }
  }

  updateUser(id, data: UserModel) {
    return this.http.put(environment.apiUrl + '/users/' + id, data)
      .pipe(map((res: { status: 'success' | 'error', user: UserModel }) => {
        if (res.status === 'success') {
          const index = this.users.findIndex(u => u.id === id);
          const updatedUser = { ...this.users[index], ...res.user };
          if (this.users[index].country_id !== res.user.country_id) {
            this.countryService.fetchCountry(res.user.country_id)
              .subscribe(country => {
                updatedUser.country = country.name_pretty;
                this.users.splice(index, 1, updatedUser);
                this.usersChannel.next(this.users);
              });
          } else {
            this.users.splice(index, 1, { ...this.users[index], ...res.user });
            this.usersChannel.next(this.users);
          }
        }
      }));
  }
}
