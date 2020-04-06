import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'v-max-filesize',
  templateUrl: './max-file-size.component.html',
  styles: [
  ],
})
export class MaxFileSizeComponent {
  @Input() validate: AbstractControl;
  @Input() name: string;
  @Input() maxSize: string;

  constructor() { }
}
