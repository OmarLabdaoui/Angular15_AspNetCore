import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';
import { User } from '../user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = false
  registerForm: FormGroup
  constructor(private toast: NgToastService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],

    })
  }
  onRegister() {
    console.log(this.registerForm.value)
    if (!this.registerForm.valid) {
      return;
    }
    this.auth.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.auth.setToken(response.token)
        this.router.navigate(["/"])
        this.toast.success({ detail: "success", summary: "register Suceess" })
      },
      error: (err) => {
        this.toast.warning({ detail: "WARN", summary: err.error.message, duration: 7000 })
      }
    })
  }
}
