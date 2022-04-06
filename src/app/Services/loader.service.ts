import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new BehaviorSubject<boolean>(false);

  /// Display the loader
  show() {
    this.isLoading.next(true);
  }

  /// Hides the loader
  hide() {
    this.isLoading.next(false);
  }
}
