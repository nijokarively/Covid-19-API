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
  @ViewChild('barChartActive', { read: ElementRef, static: false }) private barChartActive: ElementRef;
  @ViewChild('barChartClosed', { read: ElementRef, static: false }) private barChartClosed: ElementRef;
  @ViewChild('barChartOverview', { read: ElementRef, static: false }) private barChartOverview: ElementRef;

  bars: any;
  colorArray: any;

  private historical: any = null;
  private countryName: any = null;
  searchCountry: any;

  private countryCode = '';
  private dataSetName = '';
  private sub: Subscription;


  private tDates = [];
  private tCases = [];
  private tDeaths = [];
  private tRecovered = [];
  private tActive = [];
  private tClosed = [];

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
      this.loadCharts();
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
          pointRadius: 3,
          data: this.tCases,
          backgroundColor: 'rgba(25,118,210, 0.7)', 
          borderColor: 'rgb(25,118,210)',
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
              callback: function (value, index, array) { 
                if (value >= 1000000) {
                  return value / 1000000 + 'M';
                } else if (value >= 1000){
                  return value / 1000 + 'K';
                }
                else{
                  return value;
                }
              }
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
          pointRadius: 3,
          data: this.tDeaths,
          backgroundColor: 'rgba(211,47,47, 0.7)', 
          borderColor: 'rgb(211,47,47)',
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
              callback: function (value, index, array) { 
                if (value >= 1000000) {
                  return value / 1000000 + 'M';
                } else if (value >= 1000){
                  return value / 1000 + 'K';
                }
                else{
                  return value;
                }
              }
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
          pointRadius: 3,
          data: this.tRecovered,
          backgroundColor: 'rgba(56,142,60, 0.7)', 
          borderColor: 'rgb(56,142,60)',
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
              callback: function (value, index, array) { 
                if (value >= 1000000) {
                  return value / 1000000 + 'M';
                } else if (value >= 1000){
                  return value / 1000 + 'K';
                }
                else{
                  return value;
                }
              }
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

  createBarChartActive() {
    this.bars = new Chart(this.barChartActive.nativeElement, {
      type: 'line',
      data: {
        labels: this.tDates,
        datasets: [{
          label: 'Active Cases',
          pointRadius: 3,
          data: this.tActive,
          backgroundColor: 'rgba(124,77,255, 0.7)', 
          borderColor: 'rgb(124,77,255)',
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
              callback: function (value, index, array) { 
                if (value >= 1000000) {
                  return value / 1000000 + 'M';
                } else if (value >= 1000){
                  return value / 1000 + 'K';
                }
                else{
                  return value;
                }
              }
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

  createBarChartClosed() {
    this.bars = new Chart(this.barChartClosed.nativeElement, {
      type: 'line',
      data: {
        labels: this.tDates,
        datasets: [{
          label: 'Closed Cases',
          pointRadius: 3,
          data: this.tClosed,
          backgroundColor: 'rgba(69,90,100, 0.7)', 
          borderColor: 'rgb(69,90,100)',
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
              callback: function (value, index, array) { 
                if (value >= 1000000) {
                  return value / 1000000 + 'M';
                } else if (value >= 1000){
                  return value / 1000 + 'K';
                }
                else{
                  return value;
                }
              }
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

  createBarChartOverview() {
    this.bars = new Chart(this.barChartOverview.nativeElement, {
      type: 'line',
      data: {
        labels: this.tDates,
        datasets: [{
          label: 'Cases',
          pointRadius: 3,
          data: this.tCases,
          backgroundColor: 'rgba(25,118,210, 0.0)', 
          borderColor: 'rgb(25,118,210)',
          borderWidth: 2
        },
        {
          label: 'Deaths',
          pointRadius: 3,
          data: this.tDeaths,
          backgroundColor: 'rgba(211,47,47, 0.0)', 
          borderColor: 'rgb(211,47,47)',
          borderWidth: 2
        },
        {
          label: 'Recoveries',
          pointRadius: 3,
          data: this.tRecovered,
          backgroundColor: 'rgba(56,142,60, 0.0)', 
          borderColor: 'rgb(56,142,60)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            type: 'logarithmic',
            ticks: {
              beginAtZero: true,
              autoSkip: true,
              maxTicksLimit: 5,
              callback: function (value, index, array) { 
                if (value >= 1000000) {
                  return value / 1000000 + 'M';
                } else if (value >= 1000){
                  return value / 1000 + 'K';
                }
                else{
                  return value;
                }
              }
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
    let cases = [], deaths = [], recovered = [], active = [], closed = [], dates = [];
    if (countryTimeSeries) {
      for (let i = 0; i < countryTimeSeries.length; i++) {
        let confirmedCases = countryTimeSeries[i]['confirmed'];
        if (confirmedCases != 0) {
          var [year, month, day] = countryTimeSeries[i]['date'].split('-');
          let monthName = moment().month(parseInt(month) - 1).format("MMM");
          let date = monthName + " " + day;

          let deathsCases = countryTimeSeries[i]['deaths'];
          let recoveredCases = countryTimeSeries[i]['recovered'];
          let closedCases = deathsCases + recoveredCases;
          let activeCases = confirmedCases - closedCases;

          dates.push(date);
          cases.push(confirmedCases);
          deaths.push(deathsCases);
          recovered.push(recoveredCases);
          active.push(activeCases);
          closed.push(closedCases);
        }
      }
      this.tDates = dates;
      this.tCases = cases;
      this.tDeaths = deaths;
      this.tRecovered = recovered;
      this.tActive = active;
      this.tClosed = closed;
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

  getCountryName() {
    this.covidService.getTimeSeries().subscribe((data) => {
      if (data) {
        this.countryName = data[this.countryCode];
        this.storage.set('country-name', this.countryName);
      } else {
        this.storage.get('country-name').then((val) => {
          this.countryName = val;
        });
      }
    });
  }

  loadCharts() {
    this.parseHistoricalData();
    this.createBarChartCases();
    this.createBarChartDeaths();
    this.createBarChartRecovered();
    this.createBarChartActive();
    this.createBarChartClosed();
    this.createBarChartOverview();
  }

  ionViewWillEnter() {
    this.countryCode = this.route.snapshot.paramMap.get('id');
    this.dataSetName = 'historical-' + this.countryCode;
    this.getData(this.countryCode);
    this.getCountryName();
    this.createSubscription();
  }

  ionViewDidEnter() {
    this.loadCharts();
  }

  ionViewDidLeave() {
    this.deleteSubscription();
  }

  doRefresh(event) {
    this.createToast('Refreshing...');
    this.getData(this.countryCode);
    this.loadCharts();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
