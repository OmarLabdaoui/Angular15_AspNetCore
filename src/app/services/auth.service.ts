import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject, switchMap } from 'rxjs';
import { Users } from '../interface/users';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private data = new Subject<string>();
  m: String = ""
  constructor(private http: HttpClient, private _router: Router) { }
  login(user: User) {
    return this.http.post<any>(`${environment.baseUrl}/login`, user)
  }
  register(user: User) {
    return this.http.post<User>(`${environment.baseUrl}`, user)
  }

  GetAllUsers() {
    return this.http.get<User>(`${environment.baseUrl}`)
  }
  getToken() {
    const token = localStorage.getItem("token")
    console.log(token)
    return token

  }
  setToken(token: string) {
    localStorage.setItem("token", token)
  }

  isLoggin(): boolean {
    return !!localStorage.getItem("token")
  }
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    if (role === 'admin') {

      return true
    } else {

      return false
    }

  }
  GetDecodedToken() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded
  }
  private userid = new BehaviorSubject<Users>({})
  useridAction$ = this.userid.asObservable()
  private Action = new BehaviorSubject<String>("")
  Action$ = this.Action.asObservable()
  GetUserId() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    const user: Users = {
      id: id
    }
    this.Action.next("get")
    this.userid.next(user)
  }
  GetEditUserId(fullName: string, email: string, password: string) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    const data: Users = {
      id: id,
      fullName,
      email,
      password,
    }
    this.Action.next("update")
    this.userid.next(data)
  }
  ProfileUser$ = this.useridAction$.pipe(switchMap((id) => {
    if (this.Action.value === "get") {
      return this.http.get<Users>(`https://localhost:7022/api/Users/get/${id.id}`).pipe(map((data) => {
        return data
      }))
    }
    if (this.Action.value === "update") {
      return this.http.put<Users>(`https://localhost:7022/api/Users/${id.id}`, id).pipe(map((data) => {
        return data
      }))
    }

  }))

  getFullname() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
  }

}
