import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({ selector: 'app-header', template: '' })
class HeaderComponentStub {}

@Component({ selector: 'app-footer', template: '' })
class FooterComponentStub {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponentStub, FooterComponentStub],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app-header component', () => {
    const appHeader = fixture.nativeElement.querySelector('app-header');
    expect(appHeader).toBeTruthy();
  });

  it('should render the app-footer component', () => {
    const appFooter = fixture.nativeElement.querySelector('app-footer');
    expect(appFooter).toBeTruthy();
  });
});
