import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'v-min-number',
  templateUrl: './min-number.component.html',
  styles: [],
})
export class MinNumberComponent {
  @Input() validate: AbstractControl;
  @Input() minNumber: number;
  @Input() name: string;
}
