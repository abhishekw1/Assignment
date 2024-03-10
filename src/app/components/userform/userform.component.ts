import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss',
})
export class UserformComponent implements OnInit {
  userService = inject(UserService);
  dataService = inject(DataService);
  formBuilder = inject(FormBuilder);

  isEdit = false;

  userForm = this.formBuilder.group({
    id: '',
    firstname: '',
    lastname: '',
    email: ['', Validators.email],
    address: '',
  })

  ngOnInit(): void {
    this.dataService.userObservable.subscribe(user => {
      if (user) {
        this.userForm.patchValue(user);
        this.isEdit = true;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    });
  }

  addUser() {
    const user = {
      id: this.userForm.value.id,
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      email: this.userForm.value.email,
      address: this.userForm.value.address,
    }
    if (this.userForm.valid) {
      if (this.userForm.value.id) {
        this.userService.updateUser(user).subscribe(value => {
          this.userForm.reset();
          this.dataService.removeUser();
          this.isEdit = false;
        })
      } else {
        this.userService.addUser(user).subscribe(value => {
          this.userForm.reset();
        })
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onClear() {
    this.userForm.reset();
    this.isEdit = false;
  }
}
