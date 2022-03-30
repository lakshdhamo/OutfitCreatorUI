import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { OutfitareaComponent } from './components/outfitarea/outfitarea.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { FilterComponent } from './components/filter/filter.component';
import { PaginationModule } from './modules/pagination/pagination.module';
import { ProductComponent } from './components/product/product.component';
import { AppHttpInterceptor } from './Services/httpInterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OutfitareaComponent,
    OutfitComponent,
    FilterComponent,
    ProductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
