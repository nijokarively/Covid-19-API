import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription, interval } from 'rxjs';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  info: any = null;

  private sub: Subscription;

  constructor(private covidService: CovidService, private storage: Storage, public toastController: ToastController) { }

  async createToast(msg: string) {
    console.log(msg);
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  createSubscription() {
    this.sub = interval(300000).subscribe((val) => {
      this.createToast('Refreshing...');
      this.getData();
    });
  }

  deleteSubscription() {
    this.sub.unsubscribe();
  }

  getData() {
    this.covidService.getAll().subscribe((data) => {
      if (data) {
        this.info = data;
        this.storage.set('global', data);
      } else {
        this.storage.get('global').then((val) => {
          this.info = val;
        });
      }
    });
  }

  ionViewWillEnter() {
    this.getData();
    this.createSubscription();
  }

  ionViewDidLeave() {
    this.deleteSubscription();
  }

  doRefresh(event) {
    this.createToast('Refreshing...');

    this.getData();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
