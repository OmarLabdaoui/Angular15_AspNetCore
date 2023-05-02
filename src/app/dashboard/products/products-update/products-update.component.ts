import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FruitserviceService } from 'src/app/services/fruitservice.service';
import { map, tap } from "rxjs/operators"
@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.css']
})
export class ProductsUpdateComponent implements OnInit {
  updateFruitform: FormGroup
  fruitId
  constructor(private fb: FormBuilder, private service: FruitserviceService) { }

  Fruit$ = this.service.OneFruit$.pipe(tap((fruit) => {
    this.fruitId = fruit.id
    this.updateFruitform.setValue({ name: fruit.name, price: fruit?.price, image: fruit?.image })
  }))
  ngOnInit(): void {
    this.updateFruitform = this.fb.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      image: ["", Validators.required]
    })

  }
  SubmitupdateForm() {
    console.log(this.updateFruitform.value)
    const fr = { ...this.updateFruitform.value, id: this.fruitId }
    this.service.UpdateFruit(fr)
  }

}
