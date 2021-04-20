import { AuthFormModule } from './auth-form/auth-form.module';
import { NgModule } from '@angular/core';

import { RegistrationComponent } from './registration.component';

@NgModule({
  imports: [AuthFormModule],
  exports: [RegistrationComponent],
  declarations: [RegistrationComponent],
  providers: [],
})
export class RegistrationModule {}
