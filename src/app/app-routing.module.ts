import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemDetailsComponent } from './components/product-item-details/product-item-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductItemDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'confiramtion', component: ConfirmationComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
