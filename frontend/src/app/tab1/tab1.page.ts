import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
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

  constructor(private covidService: CovidService, public toastController: ToastController) { }

  async refreshingToast() {
    console.log('Refreshing...');
    const toast = await this.toastController.create({
      message: 'Refreshing...',
      duration: 2000
    });
    toast.present();
  }

  createSubscription() {
    this.sub = interval(300000).subscribe((val) => {
      this.refreshingToast();
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
    this.refreshingToast();

    this.getData();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
