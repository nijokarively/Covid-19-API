import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  apiUrl = 'https://covid-19-tracker-api.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiUrl}all`);
  }

  getCountries() {
    return this.http.get(`${this.apiUrl}countries`);
  }

  getTimeSeries() {
    return this.http.get(`${this.apiUrl}timeseries`);
  }

  getTimeSeriesByCountry(countryCode) {
    return this.http.get(`${this.apiUrl}timeseries/${countryCode}`);
  }

  getRegions(countryCode){
    return this.http.get(`${this.apiUrl}regions/${countryCode}`);
  }
}
