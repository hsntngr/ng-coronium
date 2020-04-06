import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'v-max-length',
  templateUrl: './max-length.component.html',
  styles: [],
})
export class MaxLengthComponent {
  @Input() validate: AbstractControl;
  @Input() maxLength: number;
  @Input() name: string;

  constructor() {
  }
}
