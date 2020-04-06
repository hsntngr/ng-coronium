import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'v-not-match',
  templateUrl: './not-match.component.html',
  styles: [],
})
export class NotMatchComponent {
  @Input() validate: AbstractControl;
  @Input() match: string;
  @Input() name: string;
}
