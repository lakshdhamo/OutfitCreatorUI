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
  category!: Gender;            /// Holds Men's or Women's filter data

  constructor(private outfitService: OutfitService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /// Gets the Filter data
    this.filter$ = this.outfitService.category$.subscribe(
      (data) => {
        this.category = data;
      }
    );

    /// Loads the fresh data when reload, loads the existing data when come back from other view
    if (browserRefresh) {
      this.outfitService.getFilterData();
    } else {
      this.outfitService.publishCategory();
    }

  }

  /// Uncheck / check the sub category based on mail category
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

    /// Unchecks other categories
    this.uncheckOtherCategory(categoryMain);
  }

  /// Uncheck / check the main category based on child category select/deselect
  onSubCategorySelect(subCategory: Filters, categoryMain: Category) {
    subCategory.checked = !subCategory.checked;
    if (categoryMain.filters.filter(x => x.checked).length == categoryMain.filters.length) {
      categoryMain.checked = true;
    }
    else {
      categoryMain.checked = false;
    }

    /// Unchecks other categories
    this.uncheckOtherCategory(categoryMain);
  }

  /// Unchecks other categories
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

    /// Collect selected categories
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
  }

  /// Expand / Collapse the sub category
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

  /// Unsubscribe the Subscription
  ngOnDestroy(): void {
    this.filter$.unsubscribe();
  }


}
