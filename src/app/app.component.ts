import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoaderService } from './Services/loader.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'outfitcreator';
  subscription!: Subscription;
  loader$!: Subscription;
  isLoading = false;

  constructor(private router: Router, private loaderService: LoaderService) {

    /// To fetch the page reload data
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });

    /// Decides whether to show the loader or not
    this.loader$ = loaderService.isLoading.subscribe(
      data => this.isLoading = data
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
