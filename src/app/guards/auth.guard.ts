import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private toast: NgToastService) {

  }
  canActivate(): boolean {
    if (this.auth.isLoggin()) {
      return true;
    } else
      this.toast.warning({ detail: "warn", summary: "You Must Login To Access The cart" })
    return false


  }

}
