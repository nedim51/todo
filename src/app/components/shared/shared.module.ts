import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { TooltipDirective } from './tooltip/directive/tooltip.directive';
import { TooltipComponent } from './tooltip/container/tooltip.component';

import { NotificationContainerComponent } from './notification/notification-container/notification-container.component';
import { NotificationMessageComponent } from './notification/notification-message/notification-message.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    ButtonComponent,
    
    TooltipDirective,
    TooltipComponent,

    NotificationContainerComponent,
    NotificationMessageComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    TooltipDirective,
    NotificationContainerComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule { }
