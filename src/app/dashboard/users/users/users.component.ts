
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { Users } from 'src/app/interface/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'role', 'Actions'];
  dataSource$ = this.service.ALlUsers$

  constructor(private service: UserService) { }

  ngOnInit(): void {
    console.log("...........users")
    this.service.getUsers()

  }
  deleteUser(user: Users) {
    this.service.RemoveUser(user)
  }
  updateUserROle(Givenrole: string, id: string) {
    const userROle: Users = {
      role: Givenrole,
      id: id
    }
    this.service.updateUserole(userROle)
  }
  setNextPage() {
    this.service.setNextPage()
  }
  SetPrevPage() {
    this.service.setPrevPage()
  }
}
