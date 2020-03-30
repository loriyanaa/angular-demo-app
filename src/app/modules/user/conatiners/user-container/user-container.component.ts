import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { RoutingService } from '../../../../services/routing.service';
import { UserModel } from '../../../users/models/user.model';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';
import { UpdatedUserModel } from '../../models/updated-user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'ums-user-container',
    templateUrl: './user-container.component.html',
    styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {
    private userId: number;

    public user: UserModel;
    public user$: Observable<UserModel> = this.userService.user$;
    public updatedUser$: Observable<UpdatedUserModel> = this.userService.updatedUser$;
    public deletedUser$: Observable<boolean> = this.userService.deletedUser$;

    constructor(
        private userService: UserService,
        private routingService: RoutingService,
        private matDialog: MatDialog,
        private route: ActivatedRoute
    ) {
        this.userId = this.route.snapshot.params['id'];
    }

    public ngOnInit(): void {
        this.userService.getUser(this.userId);
             
        this.deletedUser$.pipe(first()).subscribe(() => {
            this.routingService.navigateToUsersPage();
        });
    }

    public onDeleteUser(): void {
        const dialogRef = this.matDialog.open(DeleteUserDialogComponent, { disableClose: true });

        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                this.userService.deleteUser(this.userId);
            }
        });
    }

    public onSaveUserInformation(user: UpdatedUserModel): void {
        this.userService.updateUser(user.id, user.name, user.job);
    }
}
