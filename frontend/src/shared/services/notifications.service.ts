import { Inject, Injectable } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Injectable({providedIn: 'root'})
export class NotificationsService {
  constructor(@Inject(TuiNotificationsService) private notifications: TuiNotificationsService) { }
  
  showError(label: string, message: string) {
    this.notifications.show(message, {
      label,
      status: TuiNotification.Error,
    }).subscribe();
  }

  showSuccess(message: string) {
    this.notifications.show(message, {
      status: TuiNotification.Success,
    }).subscribe();
  }
}