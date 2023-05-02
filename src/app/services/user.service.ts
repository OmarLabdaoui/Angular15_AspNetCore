import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, concatMap, map, merge, Observable, of, scan, shareReplay, switchMap, throwError } from "rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { response } from '../interface/response';
import { UserCrud, Users } from '../interface/users';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private fullname$ = new BehaviorSubject<string>("");
  private Crud = new BehaviorSubject<UserCrud<Users>>(undefined);
  CrudAction$ = this.Crud.asObservable()
  private page = new BehaviorSubject<number>(1);
  pageAction$ = this.page.asObservable()
  private Id = new BehaviorSubject<String>("");
  IdAction$ = this.Id.asObservable()
  private Role = new BehaviorSubject<Users>({});
  Rolection$ = this.Role.asObservable()
  constructor(private http: HttpClient,) { }
  m: String = ""
  setError() {
    throwError(() => {
      return "You Have An Error!!!!"
    })
  }
  GetFullName() {
    return this.fullname$.asObservable()
  }
  setFullName(value: string) {
    this.fullname$.next(value)
  }
  getUsers() {
    return this.Crud.next({ action: "get", page: 1 })
  }
  RemoveUser(user: Users) {
    this.m = "delete"
    return this.Id.next(user.id)
  }
  updateUserole(user: Users) {
    this.m = "updateRole"
    this.Role.next(user)
    return this.Id.next(user.id)

  }
  setPrevPage() {
    const pagevalue = this.page.value
    this.page.next(pagevalue.valueOf() - 1)
  }
  setNextPage() {
    const pagevalue = this.page.value
    this.page.next(pagevalue.valueOf() + 1)
  }
  Users$ = this.pageAction$.pipe(concatMap((page) => {
    return this.http.get<response<Users[]>>(`https://localhost:7022/api/Users/getAll/${page}`).pipe(map((data) => {
      return data.data
    }))
  }), shareReplay())
  ALlUsers$ = combineLatest([this.Users$, this.IdAction$]).pipe(concatMap(([userdata, id]) => {
    if (this.m === "delete") {
      return this.http.delete<Users>(`https://localhost:7022/api/Users/${id}`).pipe(map((data) => {
        return userdata.filter((us) => us.id !== data.id)
      }))
    }
    if (this.m === "updateRole") {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.put<Users>(`https://localhost:7022/api/Users/updateRole/${id}`, this.Role.value, httpOptions).pipe(map((data) => {
        // const index = userdata.findIndex((us) => us.id === id);
        // if (index !== -1) {
        //   userdata[index] = data;
        // }
        // return userdata;
        return userdata.map((us, index) => {
          if (us.id === data.id) {
            return userdata[index] = data;;
          } else {
            return us;
          }
        });
      }))
    }
    return of(userdata)
  }), shareReplay(1))

}
