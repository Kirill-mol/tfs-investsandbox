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
    TuiGroupModule
  ],
  exports: [AuthFormComponent],
  declarations: [AuthFormComponent],
  providers: [],
})
export class AuthFormModule {}
