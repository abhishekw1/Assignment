import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DataService } from '../../services/data.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent implements OnInit {

  userList$!: Observable<any>;

  userService = inject(UserService);
  dataService = inject(DataService);

  ngOnInit(): void {
    this.userService.getUsers();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userList$ = this.userService.usersListObservable$;
  }

  onEdit(user: User) {
    this.dataService.updateUser(user);
  }

  onDelete(id: number) {
    this.userService.deleteUser(id);
  }
}
