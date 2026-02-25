import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySespSidebar } from './my-sesp-sidebar';
import { provideRouter } from '@angular/router';

describe('MySespSidebar', () => {
  let component: MySespSidebar;
  let fixture: ComponentFixture<MySespSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySespSidebar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MySespSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSignIn when login button is clicked', () => {
     vi.spyOn(component.onSignIn, 'emit');
    fixture.componentRef.setInput('isAuthenticated', false);
    fixture.detectChanges();

    const compiled = (fixture.nativeElement as HTMLElement);
    const button = compiled.querySelector('[data-login]') as HTMLButtonElement;
    button.click();

    expect(component.onSignIn.emit).toHaveBeenCalled();

  });

  it('should call onSignOut when logout button is clicked', () => {
     vi.spyOn(component.onSignOut, 'emit');
    fixture.componentRef.setInput('isAuthenticated', true);
    fixture.detectChanges();

    const compiled = (fixture.nativeElement as HTMLElement);
    const button = compiled.querySelector('[data-logout]') as HTMLButtonElement;
    button.click();

    expect(component.onSignOut.emit).toHaveBeenCalled();

  });
});
