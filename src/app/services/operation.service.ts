import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  SERVER = 'http://localhost:4000';

  constructor(private http: HttpClient) { 
    // toma la url correspondiente dependiendo si estoy en modo desarrollo o produccion
    if (!isDevMode()) {
			this.SERVER = 'https://server-challengejs.herokuapp.com';
		}
  }

  getAllOperationsByUserAndType(userEmail: string, typeOperation: string): Observable<any>{
    return this.http.get<Operation[]>(
      `${this.SERVER}/api/operations/${userEmail}/${typeOperation}`
    );
  }

  createOperation(operation: Operation): Observable<any>{
    return this.http.post(`${this.SERVER}/api/operations`, operation);
  }

}
