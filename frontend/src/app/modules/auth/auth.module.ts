import { AuthFormModule } from './auth-form/auth-form.module';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';

@NgModule({
  imports: [AuthFormModule],
  exports: [AuthComponent],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule {}
