import { SharedModule } from 'src/shared/modules/shared.module';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [SharedModule],
  exports: [PageNotFoundComponent],
  declarations: [PageNotFoundComponent],
  providers: [],
})
export class PageNotFoundModule { }
