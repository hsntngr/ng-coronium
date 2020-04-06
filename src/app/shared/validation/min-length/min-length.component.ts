import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'v-min-length',
  templateUrl: './min-length.component.html',
  styles: [
  ],
})
export class MinLengthComponent {
  @Input() validate: AbstractControl;
  @Input() minLength: number;
  @Input() name: string;
}
