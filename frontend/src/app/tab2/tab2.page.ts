import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription, interval  } from 'rxjs';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  countries: any = null;
  searchCountry: any;

  private sub: Subscription;

  constructor(private covidService: CovidService, public toastController: ToastController) {}

  async refreshingToast() {
    console.log('Refreshing...');
    const toast = await this.toastController.create({
      message: 'Refreshing...',
      duration: 2000
    });
    toast.present();
  }

  createSubscription(){
    this.sub = interval(300000).subscribe((val) => { 
      this.refreshingToast();
      this.getData();
    });
  }

  deleteSubscription(){
    this.sub.unsubscribe();
  }

  getData(){
    this.covidService.getCountries().subscribe((data)=>{
      this.countries = data;
    });
  }

  ionViewWillEnter(){
    this.getData();
    this.createSubscription();
  }

  ionViewDidLeave(){
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
