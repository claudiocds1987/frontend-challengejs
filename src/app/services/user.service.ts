import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER = 'http://localhost:4000';

  constructor(private http: HttpClient) {
    
    if (!isDevMode()) {
			this.SERVER = 'https://server-challengejs.herokuapp.com';
		}
  }

  getUsers(): Observable<any>{
    return this.http.get<User[]>(`${this.SERVER}/api/users`);
  }

}
