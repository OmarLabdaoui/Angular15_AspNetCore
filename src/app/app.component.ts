import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from './user';
import { OnInit } from "@angular/core"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase';

}
