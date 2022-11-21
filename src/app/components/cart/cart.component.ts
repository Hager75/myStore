import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../product.service';
import { Product } from '../../shared/models/product.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.cartItems = this.productService.cartItems.getValue();
    this.totalPrice = this.calculateTotalPrice();
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice =
        totalPrice + this.cartItems[i]?.price * this.cartItems[i]?.amount!;
    }
    this.productService.totalPrice.next(totalPrice);
    return totalPrice;
  }
  handleAmountChange(): void {
    this.totalPrice = this.calculateTotalPrice();
  }
  handleDeleteItem(item: Product): void {
    let allProducts = this.cartItems;
    allProducts = allProducts.filter((product) => item.id !== product.id);
    this.productService.cartItems.next(allProducts);
    this.cartItems = this.productService.cartItems.getValue();
    this.totalPrice = this.calculateTotalPrice();
  }
}
