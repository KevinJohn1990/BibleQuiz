import { Injectable } from '@angular/core';
import { UtilService } from '../utils/util.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
export class DashboardInfo {
  currentIndex: number = -1;
  showOptions: boolean = false;
  showAnswer: boolean = false;
  teamAPoints: number = 0;
  teamBPoints: number = 0;
  chapterKey: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private jsonFileName: string =
    this.utilService.getAPIBaseEndpoint() + 'dashboard';

  constructor(
    private db: AngularFireDatabase,
    private utilService: UtilService
  ) {}

  getSubs(key: string) {
    return this.db
      .object<DashboardInfo>(`${this.jsonFileName}/${key}`)
      .valueChanges();
  }

  addDashboard(info: DashboardInfo) {
    return this.db.list(`${this.jsonFileName}`).push(info);
  }

  updateDashboard(key: string, info: DashboardInfo) {
    return this.db.list(`${this.jsonFileName}`).update(key, info);
  }
}
