import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  loading = false;

  constructor(private userservice: UserService, private toast: NgToastService, private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
    });

  }
  ongLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loading = true
    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.auth.setToken(response.token)
        const token = this.auth.GetDecodedToken()
        this.userservice.setFullName(token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"])
        this.loading = false
        this.toast.success({ detail: "SUCCESS", summary: response.message, duration: 8000 })
        this.loginForm.reset()
        this.router.navigate(["/"])
      },
      error: (err) => {
        this.loading = false
        this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 8000 })

      }
    })
  }
  GetemailError() {

    if (this.loginForm.get('email')?.touched && !this.loginForm.get('email')?.valid) {
      if (this.loginForm.get('email')?.errors) {

        return "Email can't Be Empty";

      }
    }
  }
  GetpasswordError() {
    if (this.loginForm.get('password')?.touched && !this.loginForm.get('password')?.valid) {
      if (this.loginForm.get('password')?.errors) {

        return "Password can't Be Empty";

      }
    }

  }

}
