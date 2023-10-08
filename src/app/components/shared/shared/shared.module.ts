import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../tooltip/directive/tooltip.directive';
import { TooltipComponent } from '../tooltip/container/tooltip.component';

@NgModule({
  declarations: [
    ButtonComponent,
    TooltipDirective,
    TooltipComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    TooltipDirective,
  ],
})
export class SharedModule { }
