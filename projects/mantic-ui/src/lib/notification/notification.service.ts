import { Injectable } from '@angular/core';
import { Notification } from './notification';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly addedSubject = new Subject<Notification>();
  private readonly removedSubject = new Subject<Notification>();

  public readonly messages: Notification[] = [];
  public readonly added = this.addedSubject.asObservable();
  public readonly removed = this.removedSubject.asObservable();

  public add(message: Notification): void {
    this.messages.push(message);
    this.addedSubject.next(message);
    if (message.timeout > 0) {
      setTimeout(() => this.remove(message), message.timeout);
    }
  }

  public remove(message: Notification): void {
    const index = this.messages.indexOf(message);
    if (index >= 0) {
      const message = this.messages.splice(index, 1);
      this.removedSubject.next(message[0]);
    }
  }

  public error(text: string, timeout = 0): void {
    this.add({ type: 'error', text, timeout });
  }

  public warning(text: string, timeout = 10000): void {
    this.add({ type: 'warning', text, timeout });
  }

  public success(text: string, timeout = 2000): void {
    this.add({ type: 'success', text, timeout });
  }

  public positive(text: string, timeout = 2000): void {
    this.add({ type: 'positive', text, timeout });
  }
}
