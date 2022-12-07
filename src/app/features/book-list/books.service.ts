import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../books.models';

const API = {
    getBooks: () => 'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
}

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
    constructor(private http: HttpClient) { }

    getBooks(): Observable<Array<Book>> {
        return this.http
            .get<{ items: Book[] }>(API.getBooks())
            .pipe(map((books) => books.items || []));
    }
}