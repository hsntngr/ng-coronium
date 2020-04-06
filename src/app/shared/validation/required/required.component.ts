import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'v-required',
  templateUrl: './required.component.html',
  styles: [
  ],
})
export class RequiredComponent {
  @Input() validate: AbstractControl;
  @Input() name: string;
}
