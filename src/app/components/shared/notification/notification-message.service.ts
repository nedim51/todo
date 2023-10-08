import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Notification, NotificationType } from "./notification";

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements OnDestroy {

    private idx = 0;
    private state: Subject<Notification> = new Subject<Notification>();

    getSubject(): Observable<Notification> {
        return this.state.asObservable();
    }

    info(title: string, message: string, timeout: number = 3000) {
        this.state.next(new Notification(this.idx++, NotificationType.info, title, message, timeout));
    }
    
    success(title: string, message: string, timeout: number = 3000) {
        this.state.next(new Notification(this.idx++, NotificationType.success, title, message, timeout));
    }
    
    warning(title: string, message: string, timeout: number = 3000) {
        this.state.next(new Notification(this.idx++, NotificationType.warning, title, message, timeout));
    }
    
    error(title: string, message: string, timeout: number = 0) {
        this.state.next(new Notification(this.idx++, NotificationType.error, title, message, timeout));
    }
    
    ngOnDestroy(): void {
        this.state.complete();
    }
}