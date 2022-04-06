import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { CountryService } from 'src/app/Services/country.service';
import { OutfitService } from 'src/app/Services/outfit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedItem = "MALE";              /// Male by default
  country$ = this.countryService.country$;
  selectedCountry = "DE";

  constructor(private countryService: CountryService,
    private outfitService: OutfitService, private router: Router) { }

  ngOnInit(): void {
    this.selectedItem = this.outfitService.getQuery().gender;
    this.selectedCountry = this.outfitService.getQuery().country;

    /// Loads the fresh data when reload, loads the existing data when come back from other view
    if (browserRefresh) {
      this.countryService.getCountries()
    }
  }

  /// Sets the Country value to Service
  setCountry(country: any) {
    this.outfitService.setSelectedCountry(country.value);
  }

  /// Sets the Gender value to Service
  setGender(gender: string) {
    this.selectedItem = gender == "MALE" ? "MALE" : "FEMALE";
    this.outfitService.setGender(gender);
  }

}


