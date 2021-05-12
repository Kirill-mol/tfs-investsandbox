import { SharedModule } from 'src/shared/modules/shared.module';
import { AccountFormModule } from '../account-form/account-form.module';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';

@NgModule({
  imports: [AccountFormModule, SharedModule],
  exports: [AuthComponent],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule {}
