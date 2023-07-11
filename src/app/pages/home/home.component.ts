import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  filter,
  map,
  switchMap,
  distinctUntilChanged,
  catchError,
  EMPTY,
  tap,
} from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/bookVolumeInfo';
import { UniqueBook } from 'src/app/models/interfaces';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Infinite Scroll
  throttle = 1000;
  distance = 2;
  // Input
  searchValue = new FormControl();
  // RxJS
  errorMessage = '';
  totalOfBooks!: number;
  pagination = 0;
  booksResults: BookVolumeInfo[] = [];
  // Modal
  selectedBook: UniqueBook | undefined;
  // Loading
  isLoading = false;

  constructor(private bookService: BookService) {}

  openModal(book: UniqueBook): void {
    this.selectedBook = book;
  }

  booksFound$ = this.searchValue.valueChanges.pipe(
    debounceTime(300),
    filter((valueTyped) => valueTyped.length >= 3),
    distinctUntilChanged(),
    switchMap((valueTyped) => {
      this.isLoading = true;
      return this.bookService.getBooks(valueTyped, 0);
    }),
    tap((data) => {
      (this.totalOfBooks = data.totalItems), (this.booksResults = []);
      this.pagination = 0;
    }),
    map((data) => data.items ?? []),
    map((items) => items.map((item) => new BookVolumeInfo(item))),
    tap((response) => {
      this.booksResults = response;
      this.isLoading = false;
    }),
    catchError(() => {
      this.errorMessage = 'Ocorreu um erro. Recarregue a aplicação.';
      return EMPTY;
    })
  );

  onScroll(): void {
    if (this.searchValue.value !== null) {
      if (this.pagination > this.totalOfBooks) return;
      this.pagination += 10;
      this.isLoading = true;
      this.transformBooksIntoBookVolumeInfo().subscribe({
        next: (newBooks) => {
          this.booksResults = [...this.booksResults, ...newBooks];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  private transformBooksIntoBookVolumeInfo() {
    return this.bookService
      .getBooks(this.searchValue.value, this.pagination)
      .pipe(
        map((data) => data.items ?? []),
        map((items) => items.map((item) => new BookVolumeInfo(item)))
      );
  }
}
