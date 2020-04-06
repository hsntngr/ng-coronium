import { AbstractControl } from '@angular/forms';

export class UsersValidators {
  static validatePasswordMatch(form: AbstractControl): { [key: string]: boolean } {
    if (form.get('password').value !== form.get('password_confirmation').value && form.get('password').touched) {
      return { notMatch: true };
    }
    return null;
  }
}
