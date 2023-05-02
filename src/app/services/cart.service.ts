import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"
import { CartItem } from '../interface/CartItem';
import { Fruits } from '../interface/fruits';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CartStore$ = new BehaviorSubject<Fruits[]>([])
  constructor() { }


  SetStore(fruits: Fruits[]) {
    this.CartStore$.next(fruits)
  }
  GetStore() {
    return this.CartStore$.asObservable()
  }
}
