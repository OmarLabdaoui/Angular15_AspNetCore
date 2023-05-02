import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$ = this.auth.ProfileUser$.pipe(tap((data) => {
    console.log(data)
  }))
  constructor(private auth: AuthService, private fb: FormBuilder) {

  }
  profileForm: FormGroup

  ngOnInit(): void {
    this.auth.GetUserId()
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    })

  }
  handleEditProfile() {
    console.log('.......formValue:', this.profileForm.value.fullName, this.profileForm.value.email,
      this.profileForm.value.password)
    this.auth.GetEditUserId(
      this.profileForm.value.fullName,
      this.profileForm.value.email,
      this.profileForm.value.password
    )
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}

