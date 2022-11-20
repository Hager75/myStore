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
  productsAmount: number[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService
      .getAllProducts()
      .subscribe((res) => {
        this.products = res;
        this.getProductsAmount();
        this.isLoadingData = false;
      });
  }
  getProductsAmount(): void {
    for (let i = 0; i < this.products.length; i++) {
      const productAmount = localStorage.getItem(`${this.products[i].id}`);

      if (productAmount) {
        this.productsAmount.push(parseInt(productAmount));
      } else {
        this.productsAmount.push(1);
      }
    }
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
    localStorage.setItem(
      'cartItem',
      JSON.stringify(this.productService.cartItems.getValue())
    );
  }

}
