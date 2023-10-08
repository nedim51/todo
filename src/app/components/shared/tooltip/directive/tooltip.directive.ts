import { ComponentRef, Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '../container/tooltip.component';
import { ITooltip } from '../container/tooltip.interface';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent): void {
    if(!this.tooltipRef) {
      const { left, right, bottom } = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
      
      const tooltipParams: ITooltip = {
        title: this.tooltipTitle,
        left: (right - left) / 2 + left,
        top: bottom,
      };

      this.createTooltipByParams(tooltipParams);
    }
  }
  
  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent): void {
    if(this.tooltipRef) {
      this.viewContainerRef.clear();
      this.tooltipRef.destroy();
      this.tooltipRef = undefined;
    }
  }

  @Input({ required: true, alias: 'tooltip' }) tooltipTitle: string = '';

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {}
  
  private tooltipRef: ComponentRef<TooltipComponent> | undefined;

  private createTooltipByParams(params: ITooltip): void {
    this.tooltipRef = this.viewContainerRef.createComponent(TooltipComponent);
    this.tooltipRef.instance.setParams(params);
  }
}
