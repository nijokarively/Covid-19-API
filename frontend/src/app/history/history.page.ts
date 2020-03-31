import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Chart } from 'chart.js';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {
  @ViewChild('barChartCases', { read: ElementRef, static: false }) private barChartCases: ElementRef;
  @ViewChild('barChartDeaths', { read: ElementRef, static: false }) private barChartDeaths: ElementRef;
  @ViewChild('barChartRecovered', { read: ElementRef, static: false }) private barChartRecovered: ElementRef;
  bars: any;
  colorArray: any;

  private historical: any = null;
  searchCountry: any;

  private countryCode = '';
  private dataSetName = '';
  private sub: Subscription;


  private tDates = [];
  private tCases = [];
  private tDeaths = [];
  private tRecovered = [];

  constructor(private route: ActivatedRoute, private covidService: CovidService, public toastController: ToastController, private storage: Storage, private navCtrl: NavController) { }

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
      this.getData(this.countryCode);
    });
  }

  deleteSubscription() {
    this.sub.unsubscribe();
  }

  createBarChartCases() {
    this.bars = new Chart(this.barChartCases.nativeElement, {
      type: 'line',
      data: {
        labels: this.tDates,
        datasets: [{
          label: 'Cases',
          fill: false,
          pointRadius: 0,
          data: this.tCases,
          backgroundColor: 'rgb(25,118,210)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(25,118,210)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 5,
              callback : function(value,index,array) { return (value < 1000000) ? value/1000 + 'K' : value/1000000 + 'M'; }
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 21,
            }
          }]
        }
      }
    });
  }

  createBarChartDeaths() {
    this.bars = new Chart(this.barChartDeaths.nativeElement, {
      type: 'line',
      data: {
        labels: this.tDates,
        datasets: [{
          label: 'Deaths',
          fill: false,
          pointRadius: 0,
          data: this.tDeaths,
          backgroundColor: 'rgb(211,47,47)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(211,47,47)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 5,
              callback : function(value,index,array) { return (value < 1000000) ? value/1000 + 'K' : value/1000000 + 'M'; }
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 21,
            }
          }]
        }
      }
    });
  }

  createBarChartRecovered() {
    this.bars = new Chart(this.barChartRecovered.nativeElement, {
      type: 'line',
      data: {
        labels: this.tDates,
        datasets: [{
          label: 'Recoveries',
          fill: false,
          pointRadius: 0,
          data: this.tRecovered,
          backgroundColor: 'rgb(56,142,60)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(56,142,60)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 5,
              callback : function(value,index,array) { return (value < 1000000) ? value/1000 + 'K' : value/1000000 + 'M'; }
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 21,
            }
          }]
        }
      }
    });
  }

  parseHistoricalData() {

    let countryTimeSeries = this.historical;
    let cases = [], deaths = [], recovered = [], dates = [];
    if (countryTimeSeries) {
      for (let i = 0; i < countryTimeSeries.length; i++) {
        let confirmed = countryTimeSeries[i]['confirmed'];
        if (confirmed != 0) {
          var [year, month, day] = countryTimeSeries[i]['date'].split('-');
          let monthName = moment().month(parseInt(month) - 1).format("MMM");
          let date = monthName + " " + day;
          dates.push(date);
          cases.push(countryTimeSeries[i]['confirmed']);
          deaths.push(countryTimeSeries[i]['deaths']);
          recovered.push(countryTimeSeries[i]['recovered']);
        }
      }
      this.tDates = dates;
      this.tCases = cases;
      this.tDeaths = deaths;
      this.tRecovered = recovered;
    }
  }

  getData(countryCode: string) {
    this.covidService.getTimeSeriesByCountry(countryCode).subscribe((data) => {
      if (data) {
        this.historical = data;
        this.storage.set(this.dataSetName, data);
      } else {
        this.storage.get(this.dataSetName).then((val) => {
          this.historical = val;
        });
      }
    });
  }

  ionViewWillEnter() {
    this.countryCode = this.route.snapshot.paramMap.get('id');
    this.dataSetName = 'historical-' + this.countryCode;
    this.getData(this.countryCode);
    this.createSubscription();
  }

  ionViewDidEnter() {
    this.parseHistoricalData();
    this.createBarChartCases();
    this.createBarChartDeaths();
    this.createBarChartRecovered();
  }

  ionViewDidLeave() {
    this.deleteSubscription();
  }

  doRefresh(event) {
    this.createToast('Refreshing...');
    this.getData(this.countryCode);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
