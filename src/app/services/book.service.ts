import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  public getBooks(searchTerm: string, startIndex: number): Observable<Books> {
    const params = new HttpParams().appendAll({ q: searchTerm, startIndex });
    return this.http.get<Books>(this.API, { params });
  }
}
