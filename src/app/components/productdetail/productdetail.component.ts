import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageResolution } from 'src/app/enums/imageResolution.enum';
import { Item } from 'src/app/objects/item';
import { OutfitService } from 'src/app/Services/outfit.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  item!: Item;
  images: string[] = [];
  sizes: string = '';

  constructor(private outfitService: OutfitService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let productId = "";
    this.route.queryParams.subscribe(
      (params) => productId = params['productId']
    );
    this.outfitService.getProduct(productId).subscribe(
      (data) => {
        this.item = data;
        this.item.variants.forEach(
          variant => {

            variant.images.forEach(
              image => {
                this.images.push(this.outfitService.getOutfitImageUrl(image.key, ImageResolution.higher));
              }
            );
            let sizes: string[] = []
            variant.sizes.forEach(
              size => {
                sizes.push(size.sizeName);
              }
            );
            this.sizes = sizes.join(", ");
          }
        );
      }
    );
  }

}
