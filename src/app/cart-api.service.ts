import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; //throwError and ln 4 may not be necessary now but I like the idea of setting up error observables for the future.
import { catchError, retry, map } from 'rxjs/operators'; 
import { Item } from './Item';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private apiUrl = "http://localhost:3000/cart/";

  constructor(private http: HttpClient) { }

  //GET
  getAllItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  //DELETE
  deleteItem(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, httpOptions)
    // .pipe(
    //   catchError(this.handleError('deleteItem'))
    // );
  }

  //POST
  addItem(item: Item): Observable<any> {
    return this.http.post<Item>(this.apiUrl, item, httpOptions)
    // .pipe(
    //   catchError(this.handleError('addItem', item))
    // );
  }

  //PUT??
  //why not
  editItem(id: number, item: Item): Observable<any> {
    return this.http.put<Item>(this.apiUrl + id, item)
    //.pipe(catchError(this.handleError))
    ;
  }
  
  //angular.io's method
  // public editItem(item: Item): Observable<Item> {
  //   return this.http.put<Item>(this.apiUrl, item, httpOptions)
  // }
}
