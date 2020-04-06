import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredComponent } from './required/required.component';
import { EmailComponent } from './email/email.component';
import { MinLengthComponent } from './min-length/min-length.component';
import { NotMatchComponent } from './not-match/not-match.component';
import { MaxLengthComponent } from './max-length/max-length.component';
import { MinNumberComponent } from './min-number/min-number.component';
import { MaxNumberComponent } from './max-number/max-number.component';
import { MimeNotSupportedComponent } from './mime-not-supported/mime-not-supported.component';
import { MaxFileSizeComponent } from './max-filesize/max-file-size.component';
import { CustomComponent } from './custom/custom.component';


@NgModule({
  declarations: [
    RequiredComponent,
    EmailComponent,
    MinLengthComponent,
    NotMatchComponent,
    MaxLengthComponent,
    MinNumberComponent,
    MaxNumberComponent,
    MimeNotSupportedComponent,
    MaxFileSizeComponent,
    CustomComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RequiredComponent,
    EmailComponent,
    MinLengthComponent,
    NotMatchComponent,
    MaxLengthComponent,
    MinNumberComponent,
    MaxNumberComponent,
    MimeNotSupportedComponent,
    MaxFileSizeComponent,
    CustomComponent,
  ],
})
export class ValidationModule {
}
