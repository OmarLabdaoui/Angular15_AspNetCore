import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Fruits } from '../interface/fruits';
import { selectSearchItemss } from '../Store/searchState/Search.store';
import { map } from "rxjs/operators"
@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  search: any[] = []


  constructor(private store: Store<any>) { }
  ngOnInit(): void {
    this.store.select('SearchProducts').pipe(map(value => {
      const array = value.itemsSearch
      return array[0]
    })).subscribe(item => {
      this.search = item
      console.log(item)
    })

  }

}
