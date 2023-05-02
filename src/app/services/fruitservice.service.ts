import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fruits, CrudAction } from '../interface/fruits';
import {
  BehaviorSubject, map, Observable, Subject, tap, mergeMap, combineLatest, merge, concatMap, of, scan, shareReplay
} from 'rxjs';
import { response } from '../interface/response';
import { Store } from '@ngrx/store';
import { AllReducer } from '../Store/ReducerState';
import { showLoading } from '../Store/shared/loading.actions';

@Injectable({
  providedIn: 'root'
})
export class FruitserviceService {

  url = "http://127.0.0.1:8000/products/"
  baseUrl = "https://localhost:7022/api/Products"
  //https://localhost:7022/api/Products/or?name=or'
  constructor(private http: HttpClient, private store: Store<typeof AllReducer>) { }
  private fruits = new BehaviorSubject([]);
  cart: Fruits
  currentfruit = this.fruits.asObservable()
  private searchSubject = new Subject<String>();
  search$ = this.searchSubject.asObservable()
  NewFruits$ = this.http.get<response<Fruits[]>>("https://localhost:7022/api/Products")
  FruitsWithPagination$ = this.http.get<response<Fruits[]>>("https://localhost:7022/api/Products/1/GetAll")
  setSearchSubject(key: String) {
    this.searchSubject.next(key)
  }
  GetAllFruits(key: String): Observable<Fruits[]> {
    return this.http.get<response<Fruits[]>>(`${this.baseUrl}/${key}/? name = ` + key).pipe(map((data) => { return data.data }))
  }
  GetAll() {
    return this.http.get<any>(`${this.baseUrl}`)
  }
  SearchFruits(KeyUp: String): Observable<Fruits[]> {
    return this.NewFruits$.pipe(map((data) => {
      return data.data.filter(fruit => fruit.name.toLowerCase().includes(KeyUp.toLowerCase()))
    }))
  }
  searchFruit(name: string) {
    return this.http.get<Fruits[]>(`${this.baseUrl} / ${name} /? name = ` + name)
  }
  change(data: Fruits[]) {
    return this.fruits.next(data)
  }
  getFruitByid(id: string) {
    return this.http.get<Fruits>("https://localhost:7022/api/Products/" + id)
  }
  DeleteFruit(id: String) {
    return this.http.delete<any>(`https://localhost:7022/api/Products/${id}`)

  }

  keySubject$ = new BehaviorSubject<String>("")
  keyAction$ = this.keySubject$.asObservable()
  setKeySybject(key: String) {
    this.keySubject$.next(key)
  }
  allPost$ = combineLatest([this.NewFruits$, this.keyAction$]).pipe(map(([fruits, key]) => {
    return key && fruits.data.filter(fruit => fruit.name.toLowerCase().includes(key.toLowerCase()))
  }))
  FruitsCrudSubject$ = new Subject<CrudAction<Fruits>>()
  FruitsCrudActions$ = this.FruitsCrudSubject$.asObservable()


  AddFruit(fruit: Fruits) {
    this.FruitsCrudSubject$.next({ action: "Add", Data: fruit })

  }
  UpdateFruit(fruit: Fruits) {
    this.FruitsCrudSubject$.next({
      action: 'Update', Data: fruit
    })
  }
  private page = new BehaviorSubject<Number>(1)
  pageAction$ = this.page.asObservable()
  private Currentpage = new BehaviorSubject<Number>(1)
  private pages = new BehaviorSubject<Number>(1)
  private FruitSubject = new Subject<Fruits[]>()
  FruitsSubjectAction$ = this.FruitSubject.asObservable()
  SetFruitSubject(data: Fruits[]) {
    this.FruitSubject.next(data)
  }
  SetPageSubject() {

    if (this.Currentpage.value === this.pages.value) {
      return;
    }
    const pagevalue = this.page.value
    this.page.next(pagevalue.valueOf() + 1)
    console.log(this.Currentpage.value, pagevalue)
  }
  SetPrevPageSubject() {

    if (this.Currentpage.value === 1) {
      return;
    }
    const pagevalue = this.page.value
    this.page.next(pagevalue.valueOf() - 1)

  }
  setCurrentPage(curent: Number) {
    this.Currentpage.next(curent)
  }
  setPages(pages: Number) {
    this.pages.next(pages)
  }
  test$ = this.pageAction$.pipe(mergeMap((page) => {
    return this.http.get<response<Fruits[]>>(`https://localhost:7022/api/Products/${page}/GetAll`).pipe(tap((data) => {
      this.setCurrentPage(data.currentPage)
      this.setPages(data.page)
    }))

  }))

  AllFruits$ = combineLatest([this.FruitsWithPagination$, this.pageAction$]).pipe(map(([data, pageAction]) => {
    return { ...data, page: pageAction }
  }))


  FruitsData$ = merge(
    this.test$.pipe(
      map((data) => data.data)
    ),
    this.FruitsCrudActions$.pipe(
      concatMap((postAction) =>
        this.SaveFruits(postAction).pipe(
          map((post) => ({ ...postAction, data: post }))
        )
      )
    )
  ).pipe(
    scan((posts, value) => {
      return this.modifyFruit(posts, value);
    }, [] as Fruits[]),
    shareReplay(1),

  );
  RemoveFruit(fruit: Fruits) {
    this.FruitsCrudSubject$.next({ action: "Delete", Data: fruit })

  }
  private FruitId = new BehaviorSubject<String>("")
  FruitAction$ = this.FruitId.asObservable()

  setFruitDetail(id: String) {
    this.FruitId.next(id)
  }
  OneFruit$ = combineLatest([this.test$.pipe(map((data) => { return data.data })), this.FruitAction$]).pipe(map(([data, id]) => {
    const fruit = data.find(fr => fr.id === id)
    return fruit
  }

  ))
  // FruitsData$ = merge(
  //   this.FruitsWithPagination$.pipe(
  //     map((data) => data.data)
  //   ),
  //   this.FruitsCrudActions$.pipe(
  //     concatMap((Action) =>
  //       this.SaveFruits(Action).pipe(
  //         map((fruit) => ({ ...Action, Data: fruit }))
  //       ).pipe(scan((data, fruit) => {
  //         return this.modifyFruit(data, fruit);
  //       }, [] as Fruits[]))
  //     ),

  //   )
  // );

  SaveFruits(Action: CrudAction<Fruits>) {
    if (Action.action === "Add") {
      return this.AddFruitsToDatabase(Action.Data)
    }
    if (Action.action === "Update") {
      return this.UpdatefruitToDatabase(Action.Data)
    }
    if (Action.action === "Delete") {
      return this.DeleteFruitsFromDatabase(Action.Data).pipe(map((fruit) => Action.Data))
    }


  }
  DeleteFruitsFromDatabase(data: Fruits) {
    return this.http.delete(`https://localhost:7022/api/Products/${data.id}`)
  }
  AddFruitsToDatabase(data: Fruits) {
    return this.http.post("https://localhost:7022/api/Products/", data)
  }
  UpdatefruitToDatabase(data: Fruits) {
    return this.http.put(`https://localhost:7022/api/Products/${data.id}`, data)
  }
  modifyFruit(data: Fruits[], fruit: Fruits[] | CrudAction<Fruits>) {
    if (!(fruit instanceof Array)) {
      if (fruit.action === "Add") {
        return [...data, fruit]
      }
      if (fruit.action === "Delete") {
        data.filter((fr) => fr.id !== fruit.Data.id)
        const pagevalue = this.page.value
        this.page.next(pagevalue.valueOf())

      }
      if (fruit.action === "Update") {
        return data.map((fr) => fr.id === fruit.Data.id ? fruit.Data : fr)
      }
    } else {
      return fruit
    }
    return data
  }

}
