import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { User } from '../model/user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url = environment.apiUrl;

  private usersListSubject$ = new BehaviorSubject<User[]>(null);
  usersListObservable$ = this.usersListSubject$.asObservable();


  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  }

  constructor(private http: HttpClient) { }

  // getUsers(): Retrieve all users.
  getUsers(): void {
    this.http.get<User>(this._url).pipe(map(res => JSON.parse(JSON.stringify(res)).map((user: any) => {
      const [firstname, lastname] = user.name.split(/\s+/);
      return {
        id: user.id,
        firstname: firstname,
        lastname: lastname,
        email: user.email,
        address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
      }
    }))).subscribe(res => this.usersListSubject$.next(res));
  }

  // addUser(user: User): Add a new users.
  addUser(user: User) {
    return this.http.post(this._url, user, { headers: this.headers }).pipe(map((res: User) => {
      this.usersListSubject$.next([...this.usersListSubject$.value, res]);
      return res;
    }));
  }

  // updateUser(user: User): Update an existing users.
  updateUser(upUser: User) {
    return this.http.put(this._url + `/${upUser.id}`, upUser, { headers: this.headers }).pipe(map((resUser: User) => {
      this.usersListSubject$.next(this.usersListSubject$.value.map((subUser) => subUser.id === upUser.id ? upUser : subUser))
      return resUser;
    }))
  }

  // deleteUser(id: number): Delete a users by ID.
  deleteUser(id: number) {
    this.http.delete(this._url + `/${id}`).subscribe(res => {
      this.usersListSubject$.next(this.usersListSubject$.value.filter((user) => +user.id !== id));
    })
  }
}
