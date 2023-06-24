import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kbutton',
  templateUrl: './kbutton.component.html',
  styleUrls: ['./kbutton.component.scss'],
})
export class KbuttonComponent  {
  @Input()
  text: string = '';

  @Input()
  bgcolor: string = 'var(--ion-color-tertiary)';

  @Input()
  fgcolor: string = 'white';
  constructor() { }

}
