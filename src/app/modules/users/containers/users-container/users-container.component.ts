import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersService } from './../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'ums-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  public ngOnInit(): void {
    this.usersService.getUsers(1);
    this.users$ = this.usersService.users$;
  }

  public onPagination(event): void {
    this.usersService.getUsers(event.pageIndex + 1);
  }
}
