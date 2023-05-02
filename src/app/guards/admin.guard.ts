import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private toast: NgToastService, private _router: Router) {
  }
  canActivate() {
    if (this.auth.isLoggin() && this.auth.isAdmin()) {
      this.toast.info({ detail: "warn", summary: "Welcome To The Dashboard Admin" })
      return true
    } else {
      this._router.navigate(["/"])
      this.toast.warning({ detail: "info", summary: "Not Adminoooos" })
      return false
    }



  }
}
