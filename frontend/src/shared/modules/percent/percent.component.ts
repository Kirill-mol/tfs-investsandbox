import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-percent',
  templateUrl: 'percent.component.html',
  styleUrls: ['percent.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PercentComponent {
  @Input()
  value!: number;
}