import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController, IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription, interval } from 'rxjs';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('listScroll', { static: false }) private listScroll: IonContent;


  countries: any = null;
  historicalCountryList: any = null;
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
    this.navCtrl.navigateForward(`/tabs/tab2/regions/${countryCode}`);
  }

  getHistoricalData(countryCode: string) {
    this.navCtrl.navigateForward(`/tabs/tab2/history/${countryCode}`);
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
  }

  getTimeSeriesCountryList() {
    this.covidService.getTimeSeries().subscribe((data) => {
      if (data) {
        this.historicalCountryList = data;
        this.storage.set('historical-country-list', data);
      } else {
        this.storage.get('historical-country-list').then((val) => {
          this.historicalCountryList = val;
        });
      }
    });
  }

  goToTop() {
    this.listScroll.scrollToTop(500);
  }

  ionViewWillEnter() {
    this.getData();
    this.getTimeSeriesCountryList();
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
