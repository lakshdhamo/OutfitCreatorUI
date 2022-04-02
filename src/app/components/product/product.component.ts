import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/objects/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToProductdetail() {
    this.router.navigate(['/product'], { queryParams: { productId: this.product.id } });
  }
}
