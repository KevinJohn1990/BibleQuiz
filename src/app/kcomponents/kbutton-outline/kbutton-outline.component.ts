import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kbutton-outline',
  templateUrl: './kbutton-outline.component.html',
  styleUrls: ['./kbutton-outline.component.scss'],
})
export class KbuttonOutlineComponent  {

  @Input()
  text: string = '';

  @Input()
  fgcolor: string = 'var(--ion-color-tertiary)';
 
  @Input()
  bgcolor: string = 'white';

  constructor() { }

}
