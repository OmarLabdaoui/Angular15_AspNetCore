import { Component, OnInit } from '@angular/core';
import { CartItem } from '../interface/CartItem';
import { AuthService } from '../services/auth.service';
import jwt_decode from "jwt-decode";

import { User } from '../user';
import { CartService } from '../services/cart.service';
import { Fruits } from '../interface/fruits';
import { Store } from '@ngrx/store';
import { CartState, selectCartItems, selectCartItemstotal } from '.././Store/Cart.store';
import { IncreaseQte, removeFromCart } from '../Store/Cart.actions';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  displayedColumns: string[] = ['name', 'qte', 'price', 'Actions'];
  dataSource$ = this.store.select(selectCartItems);
  total$ = this.store.select(selectCartItemstotal)
  bold
  constructor(private store: Store, private auth: AuthService, private cart: CartService) { }

  ngOnInit() {

  }
  Remove(id: string) {
    this.store.dispatch(removeFromCart({ productId: id }));

  }
  increaseQte(fruit: Fruits) {
    this.store.dispatch(IncreaseQte({ fruit: fruit }));
  }

}




