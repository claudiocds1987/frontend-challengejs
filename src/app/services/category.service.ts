import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  SERVER = 'http://localhost:4000';

  constructor(private http: HttpClient) {
    // toma la url correspondiente dependiendo si estoy en modo desarrollo o produccion
    if (!isDevMode()) {
			this.SERVER = 'https://server-challengejs.herokuapp.com';
		}
  }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(`${this.SERVER}/api/categories`);
  }

}
