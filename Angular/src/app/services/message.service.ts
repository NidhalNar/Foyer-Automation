import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  public message$ = this.messageSubject.asObservable();

  setMessage(message: string | null) {
    this.messageSubject.next(message);
  }
  constructor() { }
}
