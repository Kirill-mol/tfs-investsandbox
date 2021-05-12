import { SharedModule } from 'src/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';

import { AccountFormComponent } from './account-form.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiGroupModule,
    SharedModule
  ],
  exports: [AccountFormComponent],
  declarations: [AccountFormComponent],
  providers: [],
})
export class AccountFormModule {}
