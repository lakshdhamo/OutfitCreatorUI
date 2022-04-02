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
  selectedItem = "MALE";

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

  onChange(country: any) {
    this.outfitService.setSelectedCountry(country.value);
  }

  setGender(gender: string) {
    this.selectedItem = gender == "MALE" ? "MALE" : "FEMALE";
    this.outfitService.setGender(gender);
  }

}


