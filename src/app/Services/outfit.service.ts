import { Gender } from './../objects/filters/gender';
import { Filter } from './../objects/filters/filter';
import { Product } from './../objects/product';
import { HttpClientService } from './httpclient.service';
import { forkJoin, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Query } from '../objects/query';
import { Outfit } from '../objects/outfit';
import { HttpParams } from '@angular/common/http';
import { Pagination } from '../objects/pagination/pagination';
import { ImageResolution } from '../enums/imageResolution.enum';

@Injectable({
  providedIn: "root"
})
export class OutfitService {
  private query = new Query();
  products$ = new Subject<Product[]>();
  category$ = new Subject<Gender>();
  pagination$ = new Subject<Pagination>()
  outfitData!: Outfit;
  products: Product[] = [];
  translates: { [name: string]: string } = {};
  filterData!: Filter;
  pagination!: Pagination;

  constructor(private http: HttpClientService) {
    this.query.country = "";
    this.query = new Query();
  }

  getQuery(): Query {
    return this.query;
  }

  updateQueryCategory(categories: string) {
    this.query.category = categories;
    this.query.offset = 0;
  }

  updateOffset(pageNumber: number) {
    this.query.offset = (pageNumber - 1) * this.query.limit;
  }

  resetQuery() {
    this.query.offset = 0;
    this.query.category = '';
  }

  setSelectedCountry(selectedCountry: string): void {
    this.query.country = selectedCountry;
    this.resetQuery();
    this.getOutfitDetails();
    this.emitCategory();
  }

  setGender(gender: string): void {
    this.query.gender = gender;
    this.resetQuery();
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
            let variant = item.variants[0];
            imageId = variant.productId;
            price = variant.currentPrice + ' ' + variant.currency;
            imageUrl = this.getOutfitImageUrl(variant.images[0].key, ImageResolution.high);

            this.products.push(
              {
                "name": imageName,
                "id": imageId,
                "price": price,
                "url": imageUrl
              });

          });

          this.emitOutfitData();
      }
    );
  }

  getFilterReq() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);
    return this.http.get('Outfit/Filters', { params: queryParams });
  }

  getTranslateData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);
    return this.http.get('Outfit/Products', { params: queryParams });
  }

  getFilterData() {
    forkJoin({
      translatedData: this.getTranslateData(),
      filterData: this.getFilterReq(),
    }).subscribe(
      data => {
        this.translates = data.translatedData;
        this.filterData = data.filterData;

        // Prepare data in required format
        this.applyCategoryTranslation(this.filterData.men, "haka_");
        this.applyCategoryTranslation(this.filterData.women, "");
        this.emitCategory();
      }
    );
  }

  getProduct(productId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);
    return this.http.get('Outfit/Product/' + productId, { params: queryParams });
  }

  applyCategoryTranslation(category: Gender, prefix: string) {
    category.categories.forEach(
      (category) => {
        category.value = this.translates['filter_' + prefix + category.name.toLocaleLowerCase()];
        category.filters.forEach(
          (subCategory) => {
            subCategory.value = this.translates['filter_' + prefix + subCategory.name.toLocaleLowerCase()];
          }
        );
      }
    );
  }

  emitOutfitData() {
    this.products$.next(this.products);
    this.pagination = new Pagination(this.outfitData.totalCount, (this.query.offset / 20) + 1);
    this.pagination$.next(this.pagination);
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

  getOutfitImageUrl(image: string, resolution: string) {
    return "https://api.newyorker.de/csp/images/image/public/" + image + "?res=" + resolution + "&frame=2_3";
  }

}
