import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'v-max-number',
  templateUrl: './max-number.component.html',
  styles: [],
})
export class MaxNumberComponent {
  @Input() validate: AbstractControl;
  @Input() maxNumber: number;
  @Input() name: string;
}
