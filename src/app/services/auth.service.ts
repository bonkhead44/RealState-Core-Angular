import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // tslint:disable-next-line:typedef
  userAuth(user: any) {
    let userList = [];
    if (localStorage.getItem('Users')) {
      userList = JSON.parse(localStorage.getItem('Users'));
      return userList.find(
        (p) => p.userName === user.userName && p.password === user.password
      );
    }
  }
}
