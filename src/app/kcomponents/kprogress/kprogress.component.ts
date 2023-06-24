import { Component, OnInit, Input, OnChanges } from '@angular/core';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-kprogress',
  templateUrl: './kprogress.component.html',
  styleUrls: ['./kprogress.component.scss'],
})
export class KprogressComponent implements OnChanges {
  @Input()
  percent: number = 0;
  previousValue: number = 0;

  bgcolor = 'var(--var-color-blue)';
  constructor() {}

  ngOnChanges() {
    if (this.percent != this.previousValue) {
      this.previousValue = this.percent;
      if (this.percent >= 70) {
        this.bgcolor = 'var(--var-color-blue)';
      } else if (this.percent >= 35) {
        this.bgcolor = 'var(--var-color-green)';
      } else {
        this.bgcolor = 'var(--var-color-red)';
      }
    }
  }
}
