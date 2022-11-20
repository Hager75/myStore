import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailsComponent } from './components/product-item-details/product-item-details.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { HeaderComponent } from './layout/header/header.component';
import { ProductService } from './product.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemDetailsComponent,
    CartComponent,
    ConfirmationComponent,
    HeaderComponent,
    ProductItemComponent,
    LoaderComponent,
    CardItemComponent,
    UserFormComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
