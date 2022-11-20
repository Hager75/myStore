import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
  };
  @Input() amount: number = 1;
  @Output() handleAddToCart = new EventEmitter();
  @Output() handleProductAmount = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.product.amount = this.amount;
  }
  onClick(): void {
    const userAnswer = confirm(
      'Are you sure to want to add this item into the cart ?'
    );
    if (userAnswer) {
      this.handleAddToCart.emit(this.product);
    }
  }
  amountChanged(amount: number) {
    this.product.amount = amount;
    this.handleProductAmount.emit(this.product);
  }
}
