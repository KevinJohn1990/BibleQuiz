import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ksearch',
  templateUrl: './ksearch.component.html',
  styleUrls: ['./ksearch.component.scss'],
})
export class KsearchComponent implements OnInit {

  @Input() placeholder = "";
  @Input() searchText = "";
  @Output() keyenter: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  emitEvent(){
    this.keyenter.emit(this.searchText);
  }

}
