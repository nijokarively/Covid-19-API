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
  searchCountry: any;
  detailCountries = ["Germany", "India", "Italy", "UK", "USA"];

  private sub: Subscription;

  constructor(private covidService: CovidService, public toastController: ToastController, private storage: Storage, private navCtrl: NavController) { }

  async refreshingToast() {
    console.log('Refreshing...');
    const toast = await this.toastController.create({
      message: 'Refreshing...',
      duration: 2000
    });
    toast.present();
  }

  getRegions(country) {
    let countryCode = '';
    
    if (country == 'Germany') {
      countryCode = 'de';
    } else if (country == 'India') {
      countryCode = 'in';
    } else if (country == 'Italy') {
      countryCode = 'it';
    } else if (country == 'UK') {
      countryCode = 'gb';
    } else if (country == 'USA') {
      countryCode = 'us';
    }

    this.navCtrl.navigateForward(`/regions/${countryCode}`);
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
