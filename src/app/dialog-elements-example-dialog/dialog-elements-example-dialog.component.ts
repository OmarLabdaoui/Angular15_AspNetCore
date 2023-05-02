import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';
import { FruitserviceService } from '../services/fruitservice.service';

@Component({
  selector: 'app-dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.component.html',
  styleUrls: ['./dialog-elements-example-dialog.component.css']
})
export class DialogElementsExampleDialogComponent implements OnInit {

  keyUp: String = ""
  Fruits$ = this.service.allPost$

  constructor(private service: FruitserviceService, private fb: FormBuilder) {

  }
  onChange(e) {
    this.service.setKeySybject(e.target.value)
  }
  ngOnInit(): void {

  }

}
