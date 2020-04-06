import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'v-email',
  templateUrl: './email.component.html',
  styles: [],
})
export class EmailComponent {
  @Input() validate: AbstractControl;
  @Input() name: string;

  constructor() {
  }
}
