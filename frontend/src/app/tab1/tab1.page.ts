import { Component } from '@angular/core';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  info: any = null;

  constructor(private covidService: CovidService) { 

    this.covidService.getAll().subscribe((data)=>{
      this.info = data;
    });

  }

  doRefresh(event) {
    console.log('Refreshing');
    
    this.covidService.getAll().subscribe((data)=>{
      this.info = data;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 3000);
  }
}
