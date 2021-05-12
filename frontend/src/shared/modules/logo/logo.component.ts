import { SizeEnum } from 'src/shared/models/size.model';
import { Size } from './../../models/size.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent {
  @Input()
  type: 'image' | 'text' | 'all' = 'all'; 

  @Input()
  orientation: 'h' | 'v' = 'h';

  @Input()
  size: Size = SizeEnum.L;
}
