import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Fruits } from '../interface/fruits';
import { AllReducer } from "../Store/ReducerState"
import { FruitserviceService } from '../services/fruitservice.service';
import { selectisLoading, selectloadingState } from '../Store/shared/Loading.store';
import { showLoading } from '../Store/shared/loading.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listofproduct',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listofproduct.component.html',
  styleUrls: ['./listofproduct.component.css'],

})
export class ListofproductComponent implements OnInit {
  ListofFruits$ = this.fruitservice.NewFruits$
  isLoading$

  constructor(private fruitservice: FruitserviceService, private store: Store<typeof AllReducer>) {

  }
  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectloadingState)
  }
  setLoadig = () => {
    this.store.dispatch(showLoading({ status: true }))
  }



}


