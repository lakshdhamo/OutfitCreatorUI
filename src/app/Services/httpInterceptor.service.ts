import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { finalize, Observable, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /// Display the loader
    this.loaderService.show()

    /// Hides the loader after some interval to give better view to user
    setTimeout(() => {
      this.loaderService.hide();
    }, 1000);

    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );

  }

}
