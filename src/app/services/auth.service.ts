import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SERVER = 'http://localhost:4000';

  constructor(private http: HttpClient) {

    // toma la url correspondiente dependiendo si estoy en modo desarrollo o produccion
    if (!isDevMode()) {
			this.SERVER = 'https://server-challengejs.herokuapp.com';
		}

  }

  // login
  userLogin(email: string, password){
    return this.http.post(`${this.SERVER}/api/auth/login`, {email, password})
  }

  // registro de usuario
  userSignup(user: User){
    return this.http.post(`${this.SERVER}/api/auth/signup`, user);
  }

  // checkUserEmail(email: string){
  //   return this.http.get(`${this.SERVER}/api/users/check/` + email);
  // }


}
