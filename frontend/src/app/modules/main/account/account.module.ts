import { SharedModule } from 'src/shared/modules/shared.module';
import { AccountFormModule } from '../../account-form/account-form.module';
import { TuiAvatarModule, TuiIslandModule } from '@taiga-ui/kit';
import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';

@NgModule({
  imports: [
    TuiAvatarModule,
    AccountFormModule,
    SharedModule
  ],
  exports: [AccountComponent],
  declarations: [AccountComponent]
})
export class AccountModule { }
