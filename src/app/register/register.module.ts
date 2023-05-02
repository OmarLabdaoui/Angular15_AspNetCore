import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { RouterModule, Routes } from "@angular/router";
import { NgToastModule } from "ng-angular-popup";
import { RegisterComponent } from "./register.component";


const routes: Routes = [{ path: '', component: RegisterComponent }]
@NgModule({
    declarations: [RegisterComponent],
    imports: [CommonModule, MatIconModule,
        MatButtonModule,
        MatInputModule, ReactiveFormsModule, NgToastModule, RouterModule.forChild(routes)]
})
export class RegisterModule { }