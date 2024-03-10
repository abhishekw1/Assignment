import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSubject = new BehaviorSubject<User | null>(null);
  userObservable = this.userSubject.asObservable();
  constructor() { }

  updateUser(user: User) {
    this.userSubject.next(user);
  }

  // reset the userSubject after the update 
  removeUser() {
    this.userSubject.next(null);
  }
}
