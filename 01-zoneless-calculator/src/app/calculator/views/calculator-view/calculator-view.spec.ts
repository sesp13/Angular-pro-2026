import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorView from './calculator-view';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  template: '<div>MockCalculator works!</div>',
})
class MockCalculator {}

describe('CalculatorView', () => {
  let component: CalculatorView;
  let fixture: ComponentFixture<CalculatorView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorView],
    }).overrideComponent(CalculatorView, {
      set: {
        imports: [MockCalculator],
      },
    });

    fixture = TestBed.createComponent(CalculatorView);
    component = fixture.componentInstance;
    // Important to get the information imported
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the calculatorComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.outerHTML);
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should contain the specfic css classes in the wrapper div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const expectedClasses =
      'w-screen mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' ',
      );

    expectedClasses.forEach((className) => {
      expect(divElement?.classList).toContain(className);
    });
    
  });
});
