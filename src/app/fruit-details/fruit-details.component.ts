
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../interface/CartItem';
import { Fruits } from '../interface/fruits';
import { CartService } from '../services/cart.service';

import { FruitserviceService } from '../services/fruitservice.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../Store/Cart.actions';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-fruit-details',
  templateUrl: './fruit-details.component.html',
  styleUrls: ['./fruit-details.component.css']
})

export class FruitDetailsComponent implements OnInit {

  constructor(private toast: NgToastService, private store: Store, private cart: CartService, private __router: Router, private route: ActivatedRoute, private service: FruitserviceService) { }
  id: string
  onefruit: Fruits
  selectedValue: number;
  foods = [
    { value: '1', viewValue: '1Kg' },
    { value: '2', viewValue: '2kg' },
    { value: '3', viewValue: '3kg' },
    { value: '4', viewValue: '4kg' },
    { value: '5', viewValue: '5kg' },
  ];


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getFruitByid(this.id).subscribe(fruit => {
      this.onefruit = fruit
      console.log(this.onefruit)
    })

  }
  addToCart(product: Fruits, quantity: Number) {
    const Cartitems: CartItem = {
      fruit: product, qte: quantity
    };
    this.store.dispatch(addToCart({ Cartitems }));;
    this.toast.info({ detail: "info", summary: `Fruit ${product.name} Added To The Cart` })
  }
}