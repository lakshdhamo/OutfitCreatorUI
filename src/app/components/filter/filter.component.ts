import { Category } from './../../objects/filters/category';
import { Gender } from './../../objects/filters/gender';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OutfitService } from 'src/app/Services/outfit.service';
import { Filter } from 'src/app/objects/filters/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filter$!: Subscription;
  category!: Gender;

  constructor(private outfitService: OutfitService) { }

  ngOnInit(): void {
    this.filter$ = this.outfitService.category$.subscribe(
      (data) => {
        this.category = data;
      }
    );
  }

  onCategorySelect(category: string){

  }

}
