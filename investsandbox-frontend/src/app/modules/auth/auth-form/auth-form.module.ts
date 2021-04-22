import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';

import { AuthFormComponent } from './auth-form.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiGroupModule,
    CommonModule
  ],
  exports: [AuthFormComponent],
  declarations: [AuthFormComponent],
  providers: [],
})
export class AuthFormModule {}
