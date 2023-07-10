import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Books } from '../models/interfaces';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send correct parameters in the HTTP request', () => {
    const searchTerm = 'angular';
    const startIndex = 5;

    service.getBooks(searchTerm, startIndex).subscribe();

    const req = httpTestingController.expectOne(
      'https://www.googleapis.com/books/v1/volumes?q=angular&startIndex=5'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('q')).toEqual(searchTerm);
    expect(req.request.params.get('startIndex')).toEqual(startIndex.toString());
  });

  it('should handle empty response', () => {
    const searchTerm = '';
    const startIndex = 0;
    const mockEmptyResponse: Books = {
      items: [],
      totalItems: 0,
    };

    service.getBooks(searchTerm, startIndex).subscribe((response) => {
      expect(response).toEqual(mockEmptyResponse);
    });

    const req = httpTestingController.expectOne(
      `${service.API}?q=${searchTerm}&startIndex=${startIndex}`
    );
    req.flush(mockEmptyResponse);
  });

  it('should retrieve books from the API', () => {
    const searchTerm = 'angular';
    const startIndex = 0;
    const mockBooksResponse = {
      items: [
        {
          volumeInfo: {
            title: 'Angular in Action',
            authors: ['Jeremy Wilken'],
            publisher: 'Manning Publications',
            publishedDate: '2018-09-30',
            description: 'A comprehensive guide to Angular development',
            pageCount: 400,
            printType: 'BOOK',
            mainCategory: 'Computers',
            categories: ['Computers', 'Web Development'],
            averageRating: 4.5,
            ratingsCount: 10,
            contentVersion: '1.1.0',
            imageLinks: {
              smallThumbnail: '...',
              thumbnail: '...',
              small: '...',
              medium: '...',
              large: '...',
              extraLarge: '...',
            },
            language: 'en',
            infoLink: '...',
            canonicalVolumeLink: '...',
            previewLink: '...',
          },
        },
      ],
      totalItems: 1,
    };
    service.getBooks(searchTerm, startIndex).subscribe((response) => {
      expect(response).toEqual(mockBooksResponse);
    });
    const req = httpTestingController.expectOne(
      `${service.API}?q=${searchTerm}&startIndex=${startIndex}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockBooksResponse);
  });
});
