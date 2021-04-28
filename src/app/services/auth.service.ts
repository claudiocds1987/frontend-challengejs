import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // registro de usuario
  userSignup(user: User){
    return this.http.post('http://localhost:4000/api/users', user);
  }


}
