import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleBooksService } from './features/book-list/books.service';
import { BooksActions, BooksApiActions } from './features/state/books.actions';
import { selectBooks, selectBookCollection } from './features/state/books.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);
 
  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }
 
  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
 
  constructor(private booksService: GoogleBooksService, private store: Store) {}
 
  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      );
  }
}
