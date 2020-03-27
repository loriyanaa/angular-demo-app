import { Component, Input } from '@angular/core';

import { User } from '../../models/user';

@Component({
    selector: 'ums-users-list-item',
    templateUrl: './users-list-item.component.html',
    styleUrls: ['./users-list-item.component.css']
})
export class UsersListItemComponent {

    @Input() user: User;

    constructor() { }
}
