import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';

import { FruitDetailsComponent } from './fruit-details/fruit-details.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { SearchProductsComponent } from './search-products/search-products.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
  { path: 'fruit-detail/:id', component: FruitDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'register', loadChildren: () => import("./register/register.module").then(m => m.RegisterModule)
  },
  { path: 'Search', component: SearchProductsComponent },
  { path: 'dash', loadChildren: () => import("./dashboard/dashboard/dashboard.module").then(m => m.DashboardModule), canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
