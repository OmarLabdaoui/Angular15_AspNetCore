import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { ListofproductComponent } from './listofproduct/listofproduct.component';
import { MatCardModule } from '@angular/material/card';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FruitDetailsComponent } from './fruit-details/fruit-details.component';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgToastModule } from 'ng-angular-popup'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { SearchProductsComponent } from './search-products/search-products.component';
import { AllReducer } from './Store/ReducerState';
import { LoadingComponent } from './Shared/loading/loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogElementsExampleDialogComponent } from './dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    ListofproductComponent,
    CartComponent,
    HomeComponent,
    FruitDetailsComponent,
    LoginComponent,


    SearchProductsComponent,
    LoadingComponent,
    DialogElementsExampleDialogComponent,
    ProfileComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatBadgeModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    NgToastModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,

    StoreModule.forRoot(AllReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
