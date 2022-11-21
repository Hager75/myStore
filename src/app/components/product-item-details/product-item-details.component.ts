import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Product } from '../../shared/models/product.model';
@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.css'],
})
export class ProductItemDetailsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
    amount: 1,
  };
  id: string = '';
  subscription: Subscription = new Subscription();
  isLoadingData = true;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;
  }
  ngOnInit(): void {
    this.subscription = this.productService
      .getAllProducts()
      .subscribe((res) => {
        this.products = res;
        const product = this.products.filter(
          (product) => product.id === +this.id
        );

        this.product = product[0];
        this.product.amount = 1;
        this.isLoadingData = false;
      });
  }
  onClick(): void {
    const userAnswer = confirm(
      'Are you sure to want to add this item into the cart ?'
    );
    if (userAnswer) {
      this.addToCart();
    }
  }
  addToCart(): void {
    const cartItems = this.productService.cartItems.getValue();
    const productCartItem = cartItems.filter(
      (item) => item.id == this.product.id
    );
    if (productCartItem.length > 0) {
      this.productService.cartItems.next(
        cartItems.filter((item) => item.id !== this.product.id)
      );
      productCartItem[0].amount = this.product.amount;
      this.productService.cartItems.next([
        ...this.productService.cartItems.getValue(),
        productCartItem[0],
      ]);
    } else {
      this.productService.cartItems.next([
        ...this.productService.cartItems.getValue(),
        this.product,
      ]);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
