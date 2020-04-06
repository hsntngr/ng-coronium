import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'v-mime-not-supported',
  templateUrl: './mime-not-supported.component.html',
  styles: [],
})
export class MimeNotSupportedComponent {
  validate: AbstractControl;
  supportedTypes: string;
  name: string;
}
