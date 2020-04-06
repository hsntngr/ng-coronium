import { Component, ContentChild, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { CountryService } from '@core/services/country.service';
import { CountryModel } from '@core/models/country.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsersValidators } from '../users.validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  @ContentChild('emailErrors') emailErrorContainer;
  createForm: FormGroup;
  countries: CountryModel[];
  countrySub: Subscription;
  serverSideErrors: string[];

  constructor(private userService: UserService, private countryService: CountryService, private router: Router) {
  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      surname: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      country_id: new FormControl(null, [Validators.required, Validators.max(238)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(255)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      age: new FormControl(null, Validators.max(150)),
      phone: new FormControl(null, Validators.maxLength(20)),
      phone_country_code: new FormControl(null, Validators.maxLength(6)),
      bio: new FormControl(null, Validators.maxLength(255)),
      profession: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    }, UsersValidators.validatePasswordMatch);

    this.countrySub = this.countryService.fetchCountries()
      .subscribe(countries => this.countries = countries);
  }

  onSubmit() {
    this.userService.storeUser(this.createForm.value)
      .subscribe(
        (res: { id: number }) => {
          this.userService.pushUser({ ...this.createForm.value, ...res });
          this.router.navigate(['/admin/users']);
        },
        (err: { status: number, error: any }) => {
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
  }
}
