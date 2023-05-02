import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsAdminComponent } from "../products/products-admin/products-admin.component";
import { DashboardComponent } from "./dashboard.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateFruitComponent } from "../products/create-fruit/create-fruit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductsUpdateComponent } from "../products/products-update/products-update.component";
import { UsersComponent } from "../users/users/users.component";
import { MatMenuModule } from '@angular/material/menu';
const routes: Routes = [
    { path: "", component: DashboardComponent, children: [{ path: "update", component: ProductsUpdateComponent, }, { path: "users", component: UsersComponent, }, { path: "fruits", component: ProductsAdminComponent, children: [{ path: "Createfruit", component: CreateFruitComponent }] }] }]
@NgModule({
    declarations: [DashboardComponent, ProductsAdminComponent, CreateFruitComponent, ProductsUpdateComponent, UsersComponent],
    imports: [CommonModule, MatMenuModule, MatListModule, MatButtonModule, MatDialogModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class DashboardModule { }