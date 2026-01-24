import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Recommended way to work with host events
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class Calculator {
  public calculatorButtons = viewChildren(CalculatorButton);
  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  private calculatorService = inject(CalculatorService);

  public handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  // Old way with host listener
  // @HostListener('document:keyup', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    };
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
