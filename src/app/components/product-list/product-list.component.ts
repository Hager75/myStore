import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './../../product.service';
import { Product } from '../../shared/models/product.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription = new Subscription();
  isLoadingData = true;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService
      .getAllProducts()
      .subscribe((res) => {
        this.products = res;
        this.isLoadingData = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addToCart(addedProduct: Product): void {
    const cartItems = this.productService.cartItems.getValue();
    const productCartItem = cartItems.filter(
      (item) => item.id == addedProduct.id
    );
    if (productCartItem.length > 0) {
      this.productService.cartItems.next(
        cartItems.filter((item) => item.id !== addedProduct.id)
      );
    }
    this.productService.cartItems.next([
      ...this.productService.cartItems.getValue(),
      addedProduct,
    ]);
  }
}
