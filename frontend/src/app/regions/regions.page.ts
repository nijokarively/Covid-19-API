import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage {

  regions: any = null;
  searchRegion: any;

  private sub: Subscription;
  private countryCode = '';

  constructor(private route: ActivatedRoute, private covidService: CovidService, public toastController: ToastController, private storage: Storage) { }

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
    this.covidService.getRegions(this.countryCode).subscribe((data) => {
      if (data) {
        this.regions = data;
        this.storage.set(this.countryCode, data);
      } else {
        this.storage.get(this.countryCode).then((val) => {
          this.regions = val;
        });
      }
    });
  }

  ionViewWillEnter() {
    this.countryCode = this.route.snapshot.paramMap.get('id');
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
