import { HttpClientService } from './httpclient.service';
import { Observable } from 'rxjs';
import { Country } from './../objects/country';
import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CountryService implements OnInit {


  constructor(private http: HttpClientService) {
  }

  ngOnInit() {

  }

  getCountries(): Observable<Country[]> {
    return this.http.get('Outfit/Countries');
  }



}
