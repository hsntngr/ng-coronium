import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponents } from './layouts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidationModule } from './validation/validation.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ...LayoutComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidationModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ValidationModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ...LayoutComponents,
  ],
})
export class SharedModule {
}
