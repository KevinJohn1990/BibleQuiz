import { Component, OnInit } from '@angular/core';
import { UtilService } from '../utils/util.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss', '../utils/shared.scss'],
})
export class SettingsPage implements OnInit {
  headerTitle: string = 'Settings';
  entriesPerPage: number = 5;

  constructor(private utilService: UtilService) {}

  ngOnInit() {
    this.entriesPerPage = this.utilService.getMaxEntriesPerPage();
  }

  changeStyle(color: string = '#5260ff') {
    localStorage.setItem('theme-color', color);
    var root: any = document.querySelector(':root');
    root.style.setProperty('--ion-color-tertiary', color);
    root.style.setProperty(
      '--var-color-boxshadow',
      'var(--ion-color-tertiary)'
    );
  }

  setPage(val: number) {
    this.utilService.setMaxEntriesPerPage(val);
    this.entriesPerPage = this.utilService.getMaxEntriesPerPage();
  }
}
