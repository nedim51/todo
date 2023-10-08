import { trigger, transition, query, style, animate } from "@angular/animations";

export const notificationAnimation = trigger('notificationAnimation', [
  transition(':enter',
    query('*', [
      style({ position: 'relative', height: 0, opacity: 0 }),
      animate('200ms', style({ position: 'relative', height: '*', opacity: 1 }))
    ])),
  transition(':leave',
    query('*', [
      style({ position: 'relative', height: '*', opacity: 1 }),
      animate('100ms', style({ position: 'relative', height: 0, opacity: 0 }))
    ]))
])