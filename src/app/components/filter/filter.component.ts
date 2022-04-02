import { Category } from './../../objects/filters/category';
import { Gender } from './../../objects/filters/gender';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OutfitService } from 'src/app/Services/outfit.service';
import { Filters } from 'src/app/objects/filters/filters';
import { ActivatedRoute } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  filter$!: Subscription;
  category!: Gender;

  constructor(private outfitService: OutfitService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.filter$ = this.outfitService.category$.subscribe(
      (data) => {
        this.category = data;
      }
    );
    if (browserRefresh) {
      this.outfitService.getFilterData();
    } else {
      this.outfitService.emitCategory();
    }

  }

  onCategorySelect(categoryMain: Category) {
    categoryMain.checked = !categoryMain.checked;
    categoryMain.filters.forEach(
      filter => {
        if (categoryMain.checked) {
          filter.checked = true
        } else {
          filter.checked = false
        }
      }
    );

    this.uncheckOtherCategory(categoryMain);
  }

  onSubCategorySelect(subCategory: Filters, categoryMain: Category) {
    subCategory.checked = !subCategory.checked;
    if (categoryMain.filters.filter(x => x.checked).length == categoryMain.filters.length) {
      categoryMain.checked = true;
    }
    else {
      categoryMain.checked = false;
    }

    this.uncheckOtherCategory(categoryMain);
  }

  uncheckOtherCategory(categoryMain: Category) {
    /// Uncheck other categories
    this.category.categories.forEach(item => {
      if (item.name != categoryMain.name) {

        /// Deselecting parent
        if (item.checked)
          item.checked = false;

        /// Deselecting childs
        item.filters.forEach(
          val => {
            if (val.checked)
              val.checked = false
          }
        );
      }
    }
    );

    /// Collected selected categories
    let categoryVal = "";
    /// Collect parent category item
    if (categoryMain.checked)
      categoryVal += categoryMain.name;

    /// Collect child category items
    categoryMain.filters.forEach(data => {
      if (data.checked) {
        if (categoryVal.length > 0)
          categoryVal += ","

        categoryVal += data.name;
      }
    });

    /// Update Category and get the latest outfit details.
    this.outfitService.updateQueryCategory(categoryVal);
    this.outfitService.getOutfitDetails();
  }

  handleVisible(categoryMain: Category) {
    categoryMain.expand = !categoryMain.expand;
    categoryMain.filters.forEach(data => {
      if (categoryMain.expand) {
        data.visible = true;
      }
      else {
        data.visible = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.filter$.unsubscribe();
  }


}
