import { Component, Input } from '@angular/core';

@Component({
  selector: 'v-custom',
  templateUrl: './custom.component.html',
  styles: [],
})
export class CustomComponent {
  @Input() message: string;
  @Input() messages: string[];
  @Input() alertView = false;
}
