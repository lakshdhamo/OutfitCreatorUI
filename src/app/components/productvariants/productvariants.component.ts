import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-productvariants',
  templateUrl: './productvariants.component.html',
  styleUrls: ['./productvariants.component.scss']
})
export class ProductvariantsComponent implements OnInit {
  @Input() images: string[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
