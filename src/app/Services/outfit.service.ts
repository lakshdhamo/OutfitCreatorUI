import { Gender } from './../objects/filters/gender';
import { Filter } from './../objects/filters/filter';
import { Product } from './../objects/product';
import { HttpClientService } from './httpclient.service';
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Query } from '../objects/query';
import { Outfit } from '../objects/outfit';
import { HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: "root"
})
export class OutfitService {
  private query = new Query();
  products$ = new Subject<Product[]>();
  category$ = new Subject<Gender>();
  outfitData!: Outfit;
  products: Product[] = [];
  translates: { [name: string]: string } = {};
  filterData!: Filter;

  constructor(private http: HttpClientService) {
    this.query.country = "";
    this.query = new Query();

  }

  getQuery(): Query {
    return this.query;
  }

  setSelectedCountry(selectedCountry: string): void {
    this.query.country = selectedCountry;
    this.getOutfitDetails();
    this.emitCategory();
  }

  setGender(gender: string): void {
    this.query.gender = gender;
    this.getOutfitDetails();
    this.emitCategory();
  }

  getOutfitDetails(): void {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("limit", this.query.limit);
    queryParams = queryParams.append("offset", this.query.offset);
    queryParams = queryParams.append("country", this.query.country);
    queryParams = queryParams.append("gender", this.query.gender);
    queryParams = queryParams.append("category", this.query.category);

    this.http.get('Outfit/OutfitDetails', { params: queryParams }).subscribe(
      (data) => {
        this.products = [];
        this.outfitData = data;
        let imageName = "";
        let imageId = "";
        let price = "";
        let imageUrl = "";
        this.outfitData.items.forEach(
          (item) => {
            imageName = item.name;
            imageId = item.id;
            let variant = item.variants.filter(x => x.productId == item.id)[0];
            if (!variant) {
              variant = item.variants[0];
            }
            price = variant.currentPrice;
            imageUrl = this.getOutfitImageUrl(variant.images[0].key);

            this.products.push(
              {
                "name": imageName,
                "id": imageId,
                "price": price,
                "url": imageUrl
              });

          });

        this.products$.next(this.products);
      }
    );
  }

  getTranslates(): any {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);

    this.http.get('Outfit/Products', { params: queryParams }).subscribe(
      (data) => {
        this.translates = data;
        this.getFilters();
      }
    );
  }

  getFilters(): any {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);

    this.http.get('Outfit/Filters', { params: queryParams }).subscribe(
      (data) => {
        this.filterData = data;

        // Apply translation for Category
        this.applyCategoryTranslation(this.filterData.men);
        this.applyCategoryTranslation(this.filterData.women);

        this.emitCategory();
      }
    );
  }

  applyCategoryTranslation(category: Gender) {
    category.categories.forEach(
      (category) => {
        category.value = this.translates['filter_haka_' + category.name.toLocaleLowerCase()];
        category.filters.forEach(
          (subCategory) => {
            subCategory.value = this.translates['filter_haka_' + subCategory.name.toLocaleLowerCase()];
          }
        );
      }
    );
  }

  emitCategory() {
    let category;
    if (this.query.gender == "MALE") {
      category = this.filterData.men;
    }
    else {
      category = this.filterData.women;
    }
    this.category$.next(category)
  }

  getOutfitImageUrl(image: string) {
    return "https://api.newyorker.de/csp/images/image/public/" + image + "?res=high&frame=2_3";
  }

}
