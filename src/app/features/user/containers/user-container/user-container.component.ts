import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ExternalLinksModel } from '../../../../shared/constants/external-links.model';
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
    public user$: Observable<UserModel>;

    constructor(
        private userService: UserService,
        private matDialog: MatDialog,
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        const isNewUser: boolean = this.route.snapshot.data.isNewUser;

        if (isNewUser) {
            this.user$ = of({ avatar: ExternalLinksModel.DefaultUserImage } as UserModel);
        } else {
            this.userId = +this.route.snapshot.params.id;
            this.userService.getUser(this.userId);
            this.user$ = this.userService.user$;
        }
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
        this.userService.updateUser(user);
    }

    public onAddUser(user: UpdatedUserModel): void {
        this.userService.addUser(user);
    }
}
