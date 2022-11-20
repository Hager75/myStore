import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  totalPrice: number = 0;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.totalPrice = this.productService.totalPrice.getValue();
  }
  ngOnDestroy(): void {
    localStorage.removeItem('cartItem');
  }
}
