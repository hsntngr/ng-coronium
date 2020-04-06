import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { CountryModel } from '../models/country.model';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private http: HttpClient) {
  }

  fetchCountries() {
    return this.http.get<CountryModel[]>(environment.apiUrl + '/countries');
  }

  fetchCountry(id: number) {
    return this.http.get<CountryModel>(environment.apiUrl + '/countries/' + id);
  }
}
