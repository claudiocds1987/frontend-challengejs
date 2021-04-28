import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  getOperations(): Observable<any>{
    // const url = 'https://jsonplaceholder.typicode.com/photos';
    const url ='https://jsonplaceholder.typicode.com/posts/1/comments'
    return this.http.get(url);
  }

  createOperation(operation: Operation): Observable<any>{
    // const url = 'https://jsonplaceholder.typicode.com/photos';
    const url ='https://jsonplaceholder.typicode.com/posts/1/comments'
    return this.http.post(url, operation);
  }

}
