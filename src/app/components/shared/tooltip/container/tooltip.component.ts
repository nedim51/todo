import { Component, HostBinding } from '@angular/core';
import { ITooltip } from './tooltip.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

  title: string = '';

  @HostBinding('style.left') 
  left: string = 0 + 'px';

  @HostBinding('style.top') 
  top: string = 0 + 'px';

  public setParams(params: ITooltip): void {
    this.title = params.title;
    this.top = `${params.top}px`;
    this.left = `${params.left}px`;
  }
}
