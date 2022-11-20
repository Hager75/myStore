import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from './../../shared/models/product.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnInit {
  @Input() item: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
    amount: 1,
  };
  @Output() handleAmountChange = new EventEmitter();
  @Output() handleDeleteItem = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  handleValidation(event: KeyboardEvent): void {
    let regex = '^[0-9]*$';
    if (!event.key.match(regex)) {
      event.preventDefault();
    }
  }
  amountChange(item: Product): void {
    this.handleAmountChange.emit();
  }
  removeItem(item: Product): void {
    const userAnswer = confirm(
      'Are you sure you want to delete this product ?'
    );
    if (userAnswer) {
      this.handleDeleteItem.emit(item);
    }
  }
}
