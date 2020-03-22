import { Component } from '@angular/core';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  countries: any = null;
  searchCountry: any;

  constructor(private covidService: CovidService) { 

    this.covidService.getCountries().subscribe((data)=>{
      this.countries = data;
    });

  }

  doRefresh(event) {
    console.log('Refreshing');
    
    this.covidService.getCountries().subscribe((data)=>{
      this.countries = data;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
