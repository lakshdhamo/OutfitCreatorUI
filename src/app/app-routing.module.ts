import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutfitareaComponent } from './components/outfitarea/outfitarea.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';

const routes: Routes = [
  { path: '', component: OutfitareaComponent },
  { path: 'product', component: ProductdetailComponent },
  { path: '**', redirectTo: 'outfitarea', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
