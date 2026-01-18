import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator',
  imports: [],
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculator { }
