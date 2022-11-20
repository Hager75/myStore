import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './shared/models/product.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartItems = new BehaviorSubject<Product[]>([]);
  totalPrice = new BehaviorSubject<number>(0);
  constructor(private httpClient: HttpClient) {}
  getAllProducts() {
    return this.httpClient.get<Product[]>('./assets/data.json');
  }
}
