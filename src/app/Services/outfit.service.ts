import { Gender } from './../objects/filters/gender';
import { Filter } from './../objects/filters/filter';
import { Product } from './../objects/product';
import { HttpClientService } from './httpclient.service';
import { BehaviorSubject, forkJoin, Subject } from 'rxjs';
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
  private query = new Query();                                    /// Holds the query data to fetch the outfit
  outfitData!: Outfit;                                            /// Holds the Outfit data
  products: Product[] = [];                                       /// Holds the list of products to be displayed
  pagination!: Pagination;                                        /// Holds the pagination data
  filterData!: Filter;                                            /// Holds the filter data
  translates: { [name: string]: string } = {};                    /// Holds the language specific translation text
  category$ = new Subject<Gender>();                              /// Filter data publisher
  products$ = new BehaviorSubject<Product[]>(this.products);      /// Product data publisher
  pagination$ = new Subject<Pagination>();                        /// Pagination data publisher

  constructor(private http: HttpClientService) {
    this.query = new Query();
  }

  /// Retuns the query value to get the outfit data
  getQuery(): Query {
    return this.query;
  }

  /// Update the current category for query data and fetch the relevant outfit data
  updateQueryCategory(categories: string) {
    this.query.category = categories;
    this.query.offset = 0;
    this.getOutfitDetails();
  }

  /// Update the current offset value for query data
  updateOffset(pageNumber: number) {
    this.query.offset = (pageNumber - 1) * this.query.limit;
  }

  /// Resets the query. Eg: when country code changes
  resetQuery() {
    this.query.offset = 0;
    this.query.category = '';
  }

  /// Update the current country code for query data and fetch the relevant outfit and filter data
  setSelectedCountry(selectedCountry: string): void {
    this.query.country = selectedCountry;
    this.resetQuery();
    this.getOutfitDetails();
    this.getFilterData();
  }

  /// Update the current gender value for query data and fetch the relevant outfit data
  setGender(gender: string): void {
    this.query.gender = gender;
    this.resetQuery();
    this.getOutfitDetails();
    this.publishCategory();
  }

  /// Gets the relevant outfit data based on the selected query value
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

            /// Custom collection to display the outfits
            this.products.push(
              {
                "name": imageName,
                "id": imageId,
                "price": price,
                "url": imageUrl
              });

          });

        /// Publish the latest outfit data to view
        this.publishOutfitData();

      }
    );
  }

  /// Prepare API request to fetch filter data
  getFilterReq() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);
    return this.http.get('Outfit/Filters', { params: queryParams });
  }

  /// Prepare API request to fetch Translation data
  getTranslateData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);
    return this.http.get('Outfit/Products', { params: queryParams });
  }

  /// Fetch the filter and translation data
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
        this.publishCategory();
      }
    );
  }

  /// Gets the individual product information
  getProduct(productId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("country", this.query.country);
    return this.http.get('Outfit/Product/' + productId, { params: queryParams });
  }

  /// Apply the translation for filter data
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

  /// Publish the outfit data
  publishOutfitData() {
    this.products$.next(this.products);
    this.publishPageginationData();
  }

  publishPageginationData() {
    this.pagination = new Pagination(this.outfitData.totalCount, (this.query.offset / 20) + 1);
    this.pagination$.next(this.pagination);
  }

  /// Publish the filter data
  publishCategory() {
    let category;
    if (this.query.gender == "MALE") {
      category = this.filterData.men;
    }
    else {
      category = this.filterData.women;
    }
    this.category$.next(category)
  }

  /// Form the image path
  getOutfitImageUrl(image: string, resolution: string) {
    return "https://api.newyorker.de/csp/images/image/public/" + image + "?res=" + resolution + "&frame=2_3";
  }

}
