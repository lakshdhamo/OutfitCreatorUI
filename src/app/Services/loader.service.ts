import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  /// Display the loader
  show() {
    this.isLoading.next(true);
  }

  /// Hides the loader
  hide() {
    this.isLoading.next(false);
  }
}
