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
  detailCountries = { "Germany": "de", "India": "in", "Italy": "it", "UK": "gb", "USA": "us", "China": "cn", "Spain": "es", "Austria": "at", "Canada": "ca", "Australia": "au", "Denmark": "dk" };
  countryNameFix = { "USA": "US", "UK": "United Kingdom", "S. Korea": "Korea, South", "UAE": "United Arab Emirates", "Taiwan": "Taiwan*", "Ivory Coast": "Cote d'Ivoire", "DRC": "Congo (Kinshasa)", "Congo": "Congo (Brazzaville)" };

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
    let countryCode = this.detailCountries[country];
    this.navCtrl.navigateForward(`/regions/${countryCode}`);
  }

  getHistoricalData(country) {
    let countryName = this.countryNameFix[country] || country;
    let tCases = [], tDeaths = [], tRecovered = [];
    let countryTimeSeries = this.historical[countryName];
    if (countryTimeSeries) {
      for (let i = 0; i < countryTimeSeries.length; i++){
        tCases.push({ 'date' : countryTimeSeries[i]['date'], 'confirmed' : countryTimeSeries[i]['confirmed']});
        tDeaths.push({ 'date' : countryTimeSeries[i]['date'], 'deaths' : countryTimeSeries[i]['deaths']});
        tRecovered.push({ 'date' : countryTimeSeries[i]['date'], 'recovered' : countryTimeSeries[i]['recovered']});
      }
      console.log(tCases);
      console.log(tDeaths);
      console.log(tRecovered);
    }
    //this.navCtrl.navigateForward(`/regions/${countryCode}`);
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
    this.refreshingToast();
    this.getData();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
