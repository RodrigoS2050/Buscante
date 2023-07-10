import { DebugElement } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let routerLinks: RouterLink[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a logo image with the correct attributes', () => {
    const logoImage = fixture.nativeElement.querySelector('img');
    expect(logoImage).toBeTruthy();
    expect(logoImage.src).toContain('assets/logo.png');
    expect(logoImage.alt).toEqual('Logo da aplicação Buscante');
  });

  it('should contain navigation links', () => {
    const navigationLinks = fixture.nativeElement.querySelectorAll('a');
    expect(navigationLinks.length).toBe(2);

    const firstLink = navigationLinks[0];
    expect(firstLink.textContent).toBe('Início');
    expect(firstLink.getAttribute('routerLink')).toBe('home');
    expect(firstLink.getAttribute('routerLinkActive')).toBe('active-link');

    const secondLink = navigationLinks[1];
    expect(secondLink.textContent).toBe('Sobre');
    expect(secondLink.getAttribute('routerLink')).toBe('about');
    expect(secondLink.getAttribute('routerLinkActive')).toBe('active-link');
  });

  it('should navigate to home when Home link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/home']);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    expect(navigateSpy.calls.mostRecent().args[0]).toEqual(['/home']);
  });

  it('should navigate to home when About link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/about']);
    expect(navigateSpy).toHaveBeenCalledWith(['/about']);
    expect(navigateSpy.calls.mostRecent().args[0]).toEqual(['/about']);
  });

  it('should check if the routes are correct', () => {
    expect(routerLinks.length).withContext('should have 2 routerLinks').toBe(2);
    expect(routerLinks[0].href).toBe('/home');
    expect(routerLinks[1].href).toBe('/about');
  });
});
