import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/objects/country';
import { CountryService } from 'src/app/Services/country.service';
import { OutfitService } from 'src/app/Services/outfit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  countries: Country[] | undefined;
  selectedItem = "MALE";              /// Male by default

  constructor(private countryService: CountryService,
    private outfitService: OutfitService, private router: Router) { }

  ngOnInit(): void {
    this.selectedItem = this.outfitService.getQuery().gender;
    this.countryService.getCountries().subscribe(
      (data: any) => {
        this.countries = data;
      }
    );
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


