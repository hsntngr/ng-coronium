import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '@core/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersValidators } from '../users.validators';
import { CountryModel } from '@core/models/country.model';
import { Subscription } from 'rxjs';
import { CountryService } from '@core/services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: UserModel;
  editForm: FormGroup;
  countries: CountryModel[];
  countrySub: Subscription;
  userSub: Subscription;
  serverSideErrors: string[];

  constructor(
    private userService: UserService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.route.data.subscribe(d => {
      this.user = d.user;

      this.editForm = new FormGroup({
        name: new FormControl(this.user.name, [Validators.required, Validators.maxLength(100)]),
        surname: new FormControl(this.user.surname, [Validators.required, Validators.maxLength(50)]),
        country_id: new FormControl(this.user.country_id, [Validators.required, Validators.max(238)]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email, Validators.maxLength(255)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        age: new FormControl(this.user.age, Validators.max(150)),
        phone: new FormControl(this.user.phone, Validators.maxLength(20)),
        phone_country_code: new FormControl(this.user.phone_country_code, Validators.maxLength(6)),
        bio: new FormControl(this.user.bio, Validators.maxLength(255)),
        profession: new FormControl(this.user.profession, [Validators.required, Validators.maxLength(255)]),
      }, UsersValidators.validatePasswordMatch);
    });

    this.countrySub = this.countryService.fetchCountries()
      .subscribe(countries => this.countries = countries);
  }

  onSubmit() {
    this.userService.updateUser(this.user.id, this.editForm.value)
      .subscribe(
        () => this.router.navigate(['/admin/users']),
        err => {
          if (Array.isArray(err.error)) {
            this.serverSideErrors = err.error;
          }

          if (typeof err.error === 'string') {
            this.serverSideErrors.push(err.error);
          }
        },
      );
  }

  ngOnDestroy(): void {
    this.countrySub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
