import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/objects/country';
import { CountryService } from 'src/app/Services/country.service';
import { OutfitService } from 'src/app/Services/outfit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private countryService: CountryService,
    private outfitService: OutfitService) { }
  countries: Country[] | undefined;

  ngOnInit(): void {
    this.outfitService.getTranslates();
    // this.outfitService.getFilters();
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
    this.outfitService.setGender(gender);
  }

}


