import { Product } from './../../objects/product';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Outfit } from 'src/app/objects/outfit';
import { OutfitService } from 'src/app/Services/outfit.service';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent implements OnInit {
  page = 1;
  productsData$!: Subscription;
  products: Product[] = [];

  constructor(private outfitService: OutfitService) { }

  ngOnInit(): void {
    this.productsData$ = this.outfitService.products$.subscribe(
      (data) => {
        this.products = data;
      }
    );
  }

  pageEvent(pageNumber: number): void {
    this.page = pageNumber;
  }

}
