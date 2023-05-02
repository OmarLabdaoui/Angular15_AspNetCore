import { Component, OnInit } from '@angular/core';
import { Fruits } from '../interface/fruits';
import { FruitserviceService } from '../services/fruitservice.service';
import { Router } from '@angular/router';
import { CartItem } from '../interface/CartItem';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import jwt_decode from "jwt-decode";
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartItemsQte, selectCartItemstotal } from '../Store/Cart.store';
import { SearchArray } from '../Store/searchState/Search.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsExampleDialogComponent } from '../dialog-elements-example-dialog/dialog-elements-example-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchItem: string = ""
  fruits: Fruits[] = [];
  qte$ = this.store.select(selectCartItemsQte)
  value: CartItem[] = []
  fullname

  constructor(public dialog: MatDialog, private store: Store, private usersevice: UserService, private fruitservice: FruitserviceService, private __router: Router, public auth: AuthService) { }
  ngOnInit(): void {
    this.usersevice.GetFullName().subscribe(value => {
      let nam = this.auth.getFullname()
      this.fullname = nam || value
    })

  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialogComponent);
  }
  gotoDash() {
    this.__router.navigate(["/dash"])
  }
  search(name: string) {
    this.fruitservice.searchFruit(name).subscribe(fruits => {
      this.store.dispatch(SearchArray({ arrayfruit: fruits }))
      this.fruitservice.change(fruits)
      console.log(fruits)
      this.__router.navigate(["/Search"])
    })

  }
  loginOut() {
    localStorage.removeItem("token")
    this.__router.navigate(["login"])
  }

}


