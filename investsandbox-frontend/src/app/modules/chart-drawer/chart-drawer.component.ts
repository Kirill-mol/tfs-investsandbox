import { ChartSize, ChartSizeEnum } from './../../../shared/models/chartSize.model';
import { Range, RangeEnum } from './../../../shared/models/range.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-drawer',
  templateUrl: './chart-drawer.component.html',
  styleUrls: ['./chart-drawer.component.less'],
})
export class ChartDrawerComponent {
  private _day = 60 * 60 * 24 * 1000;
  private _month = this._day * 30;

  @Input()
  data!: number[];

  @Input()
  range: Range = RangeEnum.MONTH;

  @Input()
  size: ChartSize = ChartSizeEnum.BIG;

  readonly chartSize = ChartSizeEnum;

  readonly horizontalLinesCount = 8;

  getMapData(): [number, number][] {
    return this.data.map((val, index) => [index, val]);
  }

  getDates(): string[] {
    const now = Date.now();
    const dates = new Array(this.data.length);

    for (let i = 0; i < this.data.length; i++) {
      dates[this.data.length - i - 1] =
        this.range === RangeEnum.MONTH
          ? this.getMonthAndDay(
              new Date(now - (i + 1) * this._day).toDateString()
            )
          : this.getMonth(new Date(now - (i + 1) * this._month).toDateString());
    }

    return dates;
  }

  getYLabels(): string[] {
    const range = Math.round(
      (this.getMaxOfData() * 1.05 - this.getMinOfData()) /
        this.horizontalLinesCount
    );
    const labels: string[] = [];

    for (
      let i = 0;
      i < (this.size === ChartSizeEnum.BIG ? this.horizontalLinesCount : 3);
      i++
    ) {
      labels.push(Math.round(this.getMinOfData() + i * range).toString());
    }

    return labels;
  }

  getMaxOfData(): number {
    return Math.max(...this.data);
  }

  getMinOfData(): number {
    return Math.min(...this.data);
  }

  private getMonthAndDay(str: string): string {
    const splited = str.split(' ');

    return splited.slice(1, 3).join(' ');
  }

  private getMonth(str: string): string {
    const splited = str.split(' ');

    return `${splited[1]} ${splited[3]}`;
  }
}
