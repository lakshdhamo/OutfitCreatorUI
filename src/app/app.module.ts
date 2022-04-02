import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { OutfitareaComponent } from './components/outfitarea/outfitarea.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductComponent } from './components/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { ProductvariantsComponent } from './components/productvariants/productvariants.component';
import { ProductinfoComponent } from './components/productinfo/productinfo.component';
import { GlobalheaderComponent } from './components/globalheader/globalheader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OutfitareaComponent,
    OutfitComponent,
    FilterComponent,
    ProductComponent,
    ProductdetailComponent,
    ProductvariantsComponent,
    ProductinfoComponent,
    GlobalheaderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
