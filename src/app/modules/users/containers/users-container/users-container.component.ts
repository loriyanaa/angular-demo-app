import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersService } from './../../services/users.service';
import { UserModel } from '../../models/user.model';
import { SearchUserModel } from './../../models/search-user.model';

@Component({
  selector: 'ums-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent implements OnInit {
    public searchCriteria: string;
    public searchText: string;
    public users$: Observable<UserModel[]> = this.usersService.users$;

    constructor(private usersService: UsersService) { }

    public ngOnInit(): void {
        this.usersService.getUsers(1);
    }

    public onPagination(event: any): void {
        this.usersService.getUsers(event.pageIndex + 1);
    }

    public onSearch(event: SearchUserModel): void {
        this.searchCriteria = event.searchCriteria;
        this.searchText = event.searchText;
    }
}
