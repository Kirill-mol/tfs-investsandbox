import { TuiButtonModule } from '@taiga-ui/core';
import { AuthFormModule } from '../../auth/auth-form/auth-form.module';
import { TuiAvatarModule, TuiIslandModule } from '@taiga-ui/kit';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';

@NgModule({
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiAvatarModule,
    TuiButtonModule,
    AuthFormModule
  ],
  exports: [AccountComponent],
  declarations: [AccountComponent]
})
export class AccountModule { }
