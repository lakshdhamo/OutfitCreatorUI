import { HttpClientService } from './httpclient.service';
import { BehaviorSubject } from 'rxjs';
import { Country } from './../objects/country';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CountryService {
  countries!: Country[];
  country$ = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClientService) {
  }

  /// Gets the provided country list from the API
  getCountries() {
    this.http.get('Outfit/Countries').subscribe(
      data => {
        this.countries = data;
        this.country$.next(data);
      }
    );
  }

}
