import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '@core/services/user.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserModel } from '@core/models/user.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit, OnDestroy {
  columns = [
    { prop: 'id', name: 'ID', width: 10 },
    { prop: 'full_name', name: 'Name' },
    { prop: 'email', name: 'Email' },
    { prop: 'country', name: 'Country' },
    { prop: 'phone_full', name: 'Phone' },
    { prop: 'profession', name: 'Profession' },
    { prop: 'age', name: 'Age' },
    { prop: 'created_at', name: 'Registered At' },
  ];
  usersCount = 0;
  rows: UserModel[];
  userLoadingState = false;
  userListSub: Subscription;
  usersCountSub: Subscription;
  columnMode = ColumnMode.force;
  editIcon: IconDefinition = faEdit;
  trashIcon: IconDefinition = faTrash;
  banIcon: IconDefinition = faBan;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userLoadingState = true;
    this.userService.fetchUsers();
    this.userListSub = this.userService.usersChannel
      .pipe(map((users: UserModel[]) => {
        return users && users.map(user => {
          user.created_at = moment(user.created_at).format('LL');
          return user;
        });
      }))
      .subscribe((users: UserModel[]) => {
        this.rows = users;
        this.userLoadingState = false;
      });
    this.usersCountSub = this.userService.usersCount
      .subscribe(c => this.usersCount = c);
  }

  onDeleteClick(id: number) {
    this.userService.deleteUser(id);
  }

  onPageChange($event: { page: number }) {
    this.userService.fetchUsers($event.page);
  }

  ngOnDestroy(): void {
    this.userListSub.unsubscribe();
    this.usersCountSub.unsubscribe();
  }
}
