import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Author, BookType} from '../../models/author';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) { }

  getAuthors() {
    const url = `${BASE_URL}/authors`;
    return this.http.get<Author[]>(url);
  }

  getAuthorById(id: number) {
    const url = `${BASE_URL}/authors/${id}`;
    return this.http.get<Author>(url);
  }
  getNationalities() {
    const url = `${BASE_URL}/nationalities`;
    return this.http.get<string[]>(url);
  }
  getBookTypes() {
    const url = `${BASE_URL}/book-types`;
    return this.http.get<BookType[]>(url);
  }
  updateAuthor(id: number, author: Author) {
    const url = `${BASE_URL}/authors/${id}`;
    return this.http.put<Author>(url, author);
  }

  createAuthor(authorData: any) {
    const url = `${BASE_URL}/authors`;
    return this.http.post<Author>(url, authorData);
  }
  deleteAuthor(id: number) {
    const url = `${BASE_URL}/authors/${id}`;
    return this.http.delete<Author>(url);
  }
}
