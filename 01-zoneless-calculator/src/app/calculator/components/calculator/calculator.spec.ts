import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { Injectable, signal } from '@angular/core';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { By } from '@angular/platform-browser';
import { CalculatorButton } from '../calculator-button/calculator-button';

class MockCalculatorService {
  public resultText = signal('100');
  public subResultText = signal('200');
  public lastOperator = signal('-');

  public constructNumber = vi.fn();
}

describe('Calculator', () => {
  let mockCalulatorService = new MockCalculatorService();
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Calculator],
      providers: [
        {
          provide: CalculatorService,
          useValue: mockCalulatorService,
        },
      ],
    });
    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;
    // Important to get the information imported
    fixture.detectChanges();

    vi.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values from service', () => {
    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('200');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display values in the template', () => {
    mockCalulatorService.resultText.set('50');
    mockCalulatorService.subResultText.set('10');
    mockCalulatorService.lastOperator.set('*');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const resultTextElement = compiled.querySelector('.result-text');
    expect(resultTextElement?.innerHTML).toContain('50');
    const subResultTextElement = compiled.querySelector('.subresult-text-container');
    expect(subResultTextElement?.innerHTML).toContain('10 *');
  });

  it('should call constructNumber when handleClick is called', () => {
    component.handleClick('5');
    expect(mockCalulatorService.constructNumber).toHaveBeenCalledWith('5');
  });

  it('should handle keyboard events correctly', () => {
    const event = new KeyboardEvent('keyup', { key: '8' });
    document.dispatchEvent(event);

    expect(mockCalulatorService.constructNumber).toHaveBeenCalledWith('8');
  });

  it('should handle special keyboard events (Enter -> =)', () => {
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(mockCalulatorService.constructNumber).toHaveBeenCalledWith('=');
  });

  it('should handle special keyboard events (Escape -> C)', () => {
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(mockCalulatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should call constructNumber when button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CalculatorButton));
    const button = buttons[0];
    button.triggerEventHandler('onClick', 'C');

    expect(mockCalulatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should update resultText signal when service updates', () => {
    mockCalulatorService.resultText.set('999');
    fixture.detectChanges();

    expect(component.resultText()).toBe('999');
  });

  it('should have 19 calculator-button components with content projected', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);

    expect(buttons[0].querySelector('button')?.innerHTML).toContain('C');
    expect(buttons[1].querySelector('button')?.innerHTML).toContain('+/-');
  });
});
