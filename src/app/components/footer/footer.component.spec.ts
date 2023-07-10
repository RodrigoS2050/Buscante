import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display developer information', () => {
    const element: HTMLElement = fixture.nativeElement;
    const footerTitle = element.querySelector('p');
    expect(footerTitle?.textContent).toEqual('Desenvolvido por Rodrigo Silva');
  });

  it('should have GitHub and LinkedIn Bootstrap icons', () => {
    const element: HTMLElement = fixture.nativeElement;
    const icons = element.querySelectorAll('i');
    expect(Number(icons.length)).toEqual(2);
    icons.forEach((item, index) => {
      const arrayItems = ['bi bi-github', 'bi bi-linkedin'];
      expect(item.getAttribute('class')).toEqual(arrayItems[index]);
    });
  });

  it('should have GitHub and LinkedIn links', () => {
    const element: HTMLElement = fixture.nativeElement;
    const socialMedias = element.querySelectorAll('a');
    expect(Number(socialMedias.length)).toEqual(2);
    socialMedias.forEach((item, index) => {
      const arrayItems = [
        'https://github.com/RodrigoS2050',
        'https://www.linkedin.com/in/rodrigo-silva-86044a224/',
      ];
      expect(item.getAttribute('href')).toEqual(arrayItems[index]);
    });
  });
});
