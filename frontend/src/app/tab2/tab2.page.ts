import { Component } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription, interval } from 'rxjs';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  countries: any = null;
  historical: any = null;
  searchCountry: any;
  private sub: Subscription;

  constructor(private covidService: CovidService, public toastController: ToastController, private storage: Storage, private navCtrl: NavController) { }

  async createToast(msg: string) {
    console.log(msg);
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  getRegions(countryCode: string) {
    this.navCtrl.navigateForward(`/regions/${countryCode}`);
  }

  getHistoricalData(countryCode: string) {

    let countryTimeSeries = this.historical[countryCode];
    if (countryTimeSeries) {
      this.navCtrl.navigateForward(`/history/${countryCode}`);
    }

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
    this.covidService.getCountries().subscribe((data) => {
      if (data) {
        this.countries = data;
        this.storage.set('countries', data);
      } else {
        this.storage.get('countries').then((val) => {
          this.countries = val;
        });
      }
    });

    this.covidService.getTimeSeries().subscribe((data) => {
      if (data) {
        this.historical = data;
        this.storage.set('historical', data);
      } else {
        this.storage.get('historical').then((val) => {
          this.historical = val;
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
