import { Product } from './../../objects/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OutfitService } from 'src/app/Services/outfit.service';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent implements OnInit, OnDestroy {
  page = 1;
  productsData$!: Subscription;
  paginationData$!: Subscription;
  products: Product[] = [];
  totalPagesCount = 0;

  constructor(private outfitService: OutfitService) { }

  ngOnInit(): void {
    this.productsData$ = this.outfitService.products$.subscribe(
      (data) => {
        this.products = data;
      }
    );

    this.paginationData$ = this.outfitService.pagination$.subscribe(
      (data => {
        this.totalPagesCount = data.totalCount;
        this.page = data.currentPage;
        window.scrollTo(0, 0);
      })
    );

    /// Loads the fresh data when reload, loads the existing data when come back from other view
    if (browserRefresh) {
      this.outfitService.getOutfitDetails();
    }
  }

  /// Fetch new data based on the page change
  pageEvent(pageNumber: any): void {
    this.page = pageNumber;
    this.outfitService.updateOffset(pageNumber);
    this.outfitService.getOutfitDetails();
  }

  /// Unsubscribe the Subscription
  ngOnDestroy(): void {
    this.productsData$.unsubscribe();
    this.paginationData$.unsubscribe();
  }

}
