import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
    // Clear spies
    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.subResultText.set('123');
    service.resultText.set('44');

    service.constructNumber('C');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText(), '1');
    service.constructNumber('2');
    expect(service.resultText(), '12');
  });

  it('should handle operators correctly', () => {
    const operators = ['+', '-', '*', '/', 'x', '÷'];

    operators.forEach((operator) => {
      service.resultText.set('12345');
      service.constructNumber(operator);

      expect(service.subResultText()).toBe('12345');
      expect(service.resultText()).toBe('0');
      expect(service.lastOperator()).toBe(operator);
    });
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('-');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2');
    service.constructNumber('0');
    service.constructNumber('x');
    service.constructNumber('3');
    service.constructNumber('0');
    service.constructNumber('=');

    expect(service.resultText()).toBe('600');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('2');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('10');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('12.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('12.5');
  });

  it('should handle decimal point starting with 0', () => {
    service.constructNumber('.');
    expect(service.resultText()).toBe('0.');
    service.constructNumber('.');
    expect(service.resultText()).toBe('0.');
  });

  it('should handle sign change +/-', () => {
    service.resultText.set('15');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-15');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('15');
  });

  it('should handle backspace', () => {
    service.resultText.set('1515');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('151');
    service.constructNumber('Backspace');
    service.constructNumber('Backspace');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle backspace with negative numbers', () => {
    service.resultText.set('-15');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('-1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});

    service.resultText.set('1234567891');
    service.constructNumber('1');
    expect(service.resultText()).toBe('1234567891');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle invalid input', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});
    const inputValue = 'D';

    service.resultText.set('125');
    service.constructNumber(inputValue);

    expect(service.resultText()).toBe('125');
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input', inputValue);
  });
});
