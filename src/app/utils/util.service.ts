import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private toastController: ToastController) {}

  public async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  public isNumeric(n: any) {
    return Number(parseFloat(n)) === n;
    // return !isNaN(parseFloat(n)) && isFinite(n);
  }

  public isNullOrEmpty(value: any): boolean {
    if (value == null || value.toString() == '') {
      return true;
    }
    return false;
  }

  public unSubscribeSubscription(subs: Subscription | null) {
    if (subs != null) {
      subs.unsubscribe();
    }
  }

  private readonly PER_PAGE_ENTRIES = 'entriesPerPage';
  private readonly MAX_ENTRY_PAGE_DEF: number = 5;

  public getMaxEntriesPerPage(): number {
    let val: string = localStorage.getItem(this.PER_PAGE_ENTRIES) || '';
    if (this.isNumeric(val)) {
      return parseInt(val);
    }
    return this.MAX_ENTRY_PAGE_DEF;
  }

  public setMaxEntriesPerPage(val: number) {
    localStorage.setItem(this.PER_PAGE_ENTRIES, val.toString());
  }

  public getAPIBaseEndpoint() {
    return `grade/${environment.grade}/`;
  }
}
