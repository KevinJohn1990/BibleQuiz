import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilService } from 'src/app/utils/util.service';
import { eNavAction, KNavInfo } from './knavInfo.model';

@Component({
  selector: 'app-knav',
  templateUrl: './knav.component.html',
  styleUrls: [
    './knav.component.scss',
  ],
})
export class KNavComponent implements OnInit {

  private readonly DEF_ENTRY_PER_PAGE: number = 5;

  @Input() interval: number = this.DEF_ENTRY_PER_PAGE;
  @Input() total: number = 20;

  from: number = 1;
  to: number = this.interval;

  @Output() NavAction = new EventEmitter<KNavInfo>();

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    this.interval = this.utilService.getMaxEntriesPerPage();
    this.to = this.interval;
    // if (this.total < this.DEF_ENTRY_PER_PAGE) {
    //   this.total = this.DEF_ENTRY_PER_PAGE
    // }
    // if (this.interval > this.total) {
    //   this.interval = this.total;
    // }
    // this.to = this.interval;
  }

  firstPage() {
    this.from = 1;
    this.to = this.interval;
    this.NavAction.emit(this.getNavObject(eNavAction.First));
  }

  lastPage() {
    this.from = parseInt((this.interval * (Math.ceil(this.total / this.interval) - 1)).toString()) + 1;
    this.to = this.from + this.interval - 1;
    console.log(this.from, " ", this.to);
    console.log(Math.ceil(this.total / this.interval));
    this.NavAction.emit(this.getNavObject(eNavAction.Last));
  }

  nextPage() {
    if (this.from + this.interval <= this.total) {
      this.from += this.interval;
      this.to += this.interval;
      this.NavAction.emit(this.getNavObject(eNavAction.Next));
    }
  }

  private getNavObject(eNavAction: eNavAction) {
    let objNav: KNavInfo = {
      from: this.from,
      to: this.to,
      action: eNavAction
    }
    return objNav;
  }

  prevPage() {
    if (this.to - this.interval >= this.interval) {
      this.from -= this.interval;
      this.to -= this.interval;
      this.NavAction.emit(this.getNavObject(eNavAction.Previous));
    }
  }

}

