import { StatisticPortfolioItemComponent } from './statisticPortfolioItem/statisticPortfolioItem.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiGroupModule } from '@taiga-ui/core';
import { TuiIslandModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import { NgModule } from '@angular/core';

import { GeneralStatisticsComponent } from './generalStatistics.component';

@NgModule({
  imports: [TuiIslandModule, TuiGroupModule, TuiRadioBlockModule, ReactiveFormsModule],
  exports: [GeneralStatisticsComponent],
  declarations: [GeneralStatisticsComponent, StatisticPortfolioItemComponent],
  providers: [],
})
export class GeneralStatisticsModule { }
