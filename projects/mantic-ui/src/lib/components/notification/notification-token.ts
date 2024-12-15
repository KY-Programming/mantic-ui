import { InjectionToken } from '@angular/core';
import { Notification } from './notification';

export const notificationToken = new InjectionToken<Notification>('Notification');
