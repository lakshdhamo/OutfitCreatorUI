import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoaderService } from './Services/loader.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  title = 'NEW YORKER | Products';
  subscription!: Subscription;
  loader$ = this.loaderService.isLoading;

  constructor(private router: Router, private loaderService: LoaderService) {

    /// To fetch the page reload data
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
