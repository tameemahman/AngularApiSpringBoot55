import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

private baseUrl = 'http://localhost:8084/api/books';

  constructor(private http: HttpClient) { }
getAllBooks():Observable<Book[]>{
return this.http.get<Book[]>(this.baseUrl);
}

addBook(book: Book): Observable<Book>{

  return this.http.post<Book>(this.baseUrl, book);
}

updateBook (book: Book): Observable<Book>{

const url = `${this.baseUrl}/${book.id}`; //Use backticks for string interpolation
return this.http.put<Book>(url,book);
}

deleteBook (id:number): Observable<void>{
  const url = `${this.baseUrl}/${id}`; // Use backticks for string Interpolation
  return this.http.delete<void>(url);
}

}
