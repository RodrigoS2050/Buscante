import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the text in the h2 element', () => {
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector('h2');
    expect(title?.textContent).toEqual('Buscante: Descubra e Explore Livros');
  });

  it('should contain the text in the p element', () => {
    const element: HTMLElement = fixture.nativeElement;
    const text = element.querySelector('p');
    expect(text?.textContent).toContain(
      'Buscante é uma aplicação inovadora projetada para os amantes da leitura'
    );
  });

  it('should contain a logo image with the correct attributes', () => {
    const image = fixture.nativeElement.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.src).toContain('assets/book-illustration.svg');
    expect(image.alt).toEqual(
      'Ilustração de um livro grande ao lado de uma pessoa'
    );
  });
});
