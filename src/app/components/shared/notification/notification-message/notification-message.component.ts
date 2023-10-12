import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../notification-message.service';
import { Subject, takeUntil } from 'rxjs';
import { Notification, NotificationType } from './../notification';
import { notificationAnimation } from '../notification.animation';

@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss'],
  animations: [notificationAnimation]
})
export class NotificationMessageComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<boolean> = new Subject<boolean>()
  notifications: Notification[] = [];
  
  private addNotification(notification: Notification) {
    
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getSubject().pipe(takeUntil(this.unsubscribe$)).subscribe((notification) => {
      this.addNotification(notification)
    })
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(item => item.id != notification.id);
  }

  className(notification: Notification): string {
    let style: string;
    switch (notification.type) {
      case NotificationType.success:
        style = 'notification__header--success';
        break;
      case NotificationType.warning:
        style = 'notification__header--danger';
        break;
      case NotificationType.error:
        style = 'notification__header--danger';
        break;
      default:
        style = 'notification__header--success';
        break;
    }
    return style;
  }

  public trackByFn(index: number, item: Notification): Notification {
    return item;
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}
