import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap, filter, tap } from "rxjs/operators"
import { Fruits } from 'src/app/interface/fruits';
import { FruitserviceService } from 'src/app/services/fruitservice.service';


@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {

  displayedColumns: string[] = ['image', 'price', 'name', 'Actions'];
  dataSource$ = this.fruitservice.FruitsData$
  update = new BehaviorSubject<Boolean>(false);
  isCreateActive: Boolean = false
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fruitservice: FruitserviceService, private router: Router) {

  }
  setIsCreate() {
    this.isCreateActive = true
  }
  deleteFruit(fruit: Fruits) {
    if (confirm("Are You Shure To delete This Fruit ?")) {
      this.fruitservice.RemoveFruit(fruit)
      this.dataSource$ = this.fruitservice.FruitsData$
    }
  }
  ngOnInit(): void {

  }

  GotoEditFruit(id: String) {
    console.log(id)
    this.fruitservice.setFruitDetail(id)
    this.router.navigate(["/dash/update"])
  }
  goNext() {
    this.fruitservice.SetPageSubject()
  }
  GoPrev() {
    this.fruitservice.SetPrevPageSubject()
  }
}



