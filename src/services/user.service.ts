import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from '../interfaces/user';
import {Observable, Subject} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRespond = new Subject<boolean>();
  //
  constructor(private http: HttpClient) {}
  //
  logIn(email: string, password: string) {
    this.check(email, password).subscribe((user: User) => {
      if (user) {
        this.userRespond.next(true);
      } else {
        this.userRespond.next(false);
      }
    });
  }
  addUser(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/users`, user, httpOptions);
  }
  //
  check(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/auth`, {
        email,
        password,
      }, httpOptions);
  }
  // get
  getUserRespond(): Observable<boolean> {
    return this.userRespond.asObservable();
  }
}
