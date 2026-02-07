import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { describe, it, expect, beforeEach } from 'vitest';

@Component({
  selector: 'app-navbar',
  template: `<nav>
    <a href="test-link" class="test-class">Test link</a>
  </nav>`,
})
class MockNavbarComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  // WAY Provide modules required by child components
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [AppComponent],
  //     providers: [provideRouter([])]
  //   }).compileComponents();
  // });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        add: {
          imports: [MockNavbarComponent],
        },
        remove: {
          imports: [Navbar],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'pokemon-ssr' title`, () => {
    expect(app.title).toEqual('pokemon-ssr');
  });

  it('should render the navbar and the router outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.innerHTML).toMatchSnapshot();
  });
});