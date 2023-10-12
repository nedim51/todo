import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { TooltipDirective } from './tooltip/directive/tooltip.directive';
import { TooltipComponent } from './tooltip/container/tooltip.component';

import { NotificationContainerComponent } from './notification/notification-container/notification-container.component';
import { NotificationMessageComponent } from './notification/notification-message/notification-message.component';

@NgModule({
  declarations: [
    ButtonComponent,
    
    TooltipDirective,
    TooltipComponent,

    NotificationContainerComponent,
    NotificationMessageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    TooltipDirective,
    NotificationContainerComponent
  ],
})
export class SharedModule { }
