import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create app', () => {
    const fixture = TestBed.createComponent(App);
    const appComponent = fixture.componentInstance;
    // Access to the template
    const compiled = fixture.nativeElement as HTMLElement;

    // Check component existence
    expect(appComponent).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    // Template
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render router-outlet with css classes', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' ',
      );

    divElement?.classList.forEach((className) => {
      expect(mustHaveClasses).toContain(className);
    });
  });
});
