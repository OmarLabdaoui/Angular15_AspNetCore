import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FruitserviceService } from 'src/app/services/fruitservice.service';

@Component({
  selector: 'app-create-fruit',
  templateUrl: './create-fruit.component.html',
  styleUrls: ['./create-fruit.component.css']
})
export class CreateFruitComponent implements OnInit {
  hide = false
  addFruitform: FormGroup
  constructor(private fb: FormBuilder, private service: FruitserviceService, private router: Router) { }

  ngOnInit(): void {
    this.addFruitform = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],

    })
  }
  SubmitAddForm() {
    console.log(this.addFruitform.value)
    this.service.AddFruit(this.addFruitform.value)
    // this.router.navigate(["/dash/fruits"])

  }
}
