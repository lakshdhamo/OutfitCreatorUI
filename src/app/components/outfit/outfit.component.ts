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
  paginationData$!: Subscription;
  products: Product[] = [];
  totalPagesCount = 0;
  products$ = this.outfitService.products$;

  constructor(private outfitService: OutfitService) {
  }

  ngOnInit(): void {
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
    } else {
      this.outfitService.publishPageginationData();
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
    this.paginationData$.unsubscribe();
  }

}
