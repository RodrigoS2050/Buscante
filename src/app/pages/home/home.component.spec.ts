import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Observable, of } from 'rxjs';
import { Books } from 'src/app/models/interfaces';

class MockBookService {
  getBooks(searchTerm: string, startIndex: number): Observable<Books> {
    const mockBooks: Books = {
      items: [
        {
          volumeInfo: {
            title: 'Book 1',
            authors: ['Author 1'],
            publisher: 'Publisher 1',
            publishedDate: '2023-01-01',
            description: 'Description 1',
            pageCount: 100,
            printType: 'Print Type 1',
            mainCategory: 'Main Category 1',
            categories: ['Category 1'],
            averageRating: 4.5,
            ratingsCount: 100,
            contentVersion: '1.0.0',
            imageLinks: {
              smallThumbnail: 'smallThumbnail1.jpg',
              thumbnail: 'thumbnail1.jpg',
              small: 'small1.jpg',
              medium: 'medium1.jpg',
              large: 'large1.jpg',
              extraLarge: 'extraLarge1.jpg',
            },
            language: 'English',
            infoLink: 'infoLink1',
            canonicalVolumeLink: 'canonicalVolumeLink1',
            previewLink: 'previewLink1',
          },
        },
        {
          volumeInfo: {
            title: 'Book 2',
            authors: ['Author 2'],
            publisher: 'Publisher 2',
            publishedDate: '2023-01-02',
            description: 'Description 2',
            pageCount: 200,
            printType: 'Print Type 2',
            mainCategory: 'Main Category 2',
            categories: ['Category 2'],
            averageRating: 4.0,
            ratingsCount: 200,
            contentVersion: '2.0.0',
            imageLinks: {
              smallThumbnail: 'smallThumbnail2.jpg',
              thumbnail: 'thumbnail2.jpg',
              small: 'small2.jpg',
              medium: 'medium2.jpg',
              large: 'large2.jpg',
              extraLarge: 'extraLarge2.jpg',
            },
            language: 'English',
            infoLink: 'infoLink2',
            canonicalVolumeLink: 'canonicalVolumeLink2',
            previewLink: 'previewLink2',
          },
        },
      ],
      totalItems: 2,
    };
    return of(mockBooks);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule, InfiniteScrollModule],
      providers: [{ provide: BookService, useClass: MockBookService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input correctly', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
    expect(inputElement.classList).toContain('form-control');
    expect(inputElement.getAttribute('aria-label')).toBe('Procurar Livro');
    expect(inputElement.getAttribute('aria-describedby')).toBe('search-icon');
    expect(inputElement.getAttribute('name')).toBe('searchValue');
  });

  it('should reflect the correct string in the input', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const expectedValue = 'Exemplo de texto';
    component.searchValue.setValue(expectedValue);
    fixture.detectChanges();
    const inputValue = inputElement.value;
    expect(inputValue).toBe(expectedValue);
  });

  it('should render the text in the h3 element', () => {
    const element: HTMLElement = fixture.nativeElement;
    const h3 = element.querySelector('h3');
    expect(h3?.textContent?.trim()).toEqual('Que livro você procura?');
  });

  it('should contain the text in the p element', () => {
    const element: HTMLElement = fixture.nativeElement;
    const text = element.querySelector('p');
    expect(text?.textContent).toEqual('Busque por assunto, autoria, nome...');
  });

  it('should render the text in the h1 element', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const h1 = element.querySelector('h1');
    expect(h1?.textContent?.trim()).toEqual(
      'Busque o livro  que quiser na  nossa estante!'
    );
  });

  it('should contain a logo image with the correct attributes', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const image = fixture.nativeElement.querySelector('.img-fluid');
    expect(image).toBeTruthy();
    expect(image.src).toContain('assets/bookcase-illustration.svg');
    expect(image.alt).toEqual(
      'Ilustração de uma pessoa em pé ao lado de uma estante com livros e plantas'
    );
  });

  it('should open modal when openModal is called', () => {
    const book = {
      title: 'Book Title',
      authors: ['Author 1', 'Author 2'],
      publisher: 'Publisher',
      publishedDate: '2022-01-01',
      description: 'Book description',
      thumbnail: 'thumbnail-url',
      previewLink: 'preview-link',
    };
    component.openModal(book);
    fixture.detectChanges();
    expect(component.selectedBook).toBe(book);
  });

  it('should return a response', () => {
    const mockResponse: any = {
      items: [
        {
          volumeInfo: {
            title: 'Book 1',
            authors: ['Author 1'],
            publisher: 'Publisher 1',
            publishedDate: '2023-01-01',
            description: 'Description 1',
            pageCount: 100,
            printType: 'Print Type 1',
            mainCategory: 'Main Category 1',
            categories: ['Category 1'],
            averageRating: 4.5,
            ratingsCount: 100,
            contentVersion: '1.0.0',
            imageLinks: {
              smallThumbnail: 'smallThumbnail1.jpg',
              thumbnail: 'thumbnail1.jpg',
              small: 'small1.jpg',
              medium: 'medium1.jpg',
              large: 'large1.jpg',
              extraLarge: 'extraLarge1.jpg',
            },
            language: 'English',
            infoLink: 'infoLink1',
            canonicalVolumeLink: 'canonicalVolumeLink1',
            previewLink: 'previewLink1',
          },
        },
        {
          volumeInfo: {
            title: 'Book 2',
            authors: ['Author 2'],
            publisher: 'Publisher 2',
            publishedDate: '2023-01-02',
            description: 'Description 2',
            pageCount: 200,
            printType: 'Print Type 2',
            mainCategory: 'Main Category 2',
            categories: ['Category 2'],
            averageRating: 4.0,
            ratingsCount: 200,
            contentVersion: '2.0.0',
            imageLinks: {
              smallThumbnail: 'smallThumbnail2.jpg',
              thumbnail: 'thumbnail2.jpg',
              small: 'small2.jpg',
              medium: 'medium2.jpg',
              large: 'large2.jpg',
              extraLarge: 'extraLarge2.jpg',
            },
            language: 'English',
            infoLink: 'infoLink2',
            canonicalVolumeLink: 'canonicalVolumeLink2',
            previewLink: 'previewLink2',
          },
        },
      ],
      totalItems: 2,
    };
    spyOn(bookService, 'getBooks').and.returnValue(of(mockResponse));
    let response;
    bookService
      .getBooks(mockResponse, 0)
      .subscribe((resp) => (response = resp));
    expect(response).toEqual(mockResponse);
  });
});
