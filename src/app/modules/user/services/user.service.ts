import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NotificationsModel } from '../../../constants/notifications.model';
import { NotificationsService } from '../../../services/notifications.service';
import { UserModel } from '../../users/models/user.model';
import { UpdatedUserModel } from '../models/updated-user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user$$ = new Subject<UserModel>();
    public user$ = this.user$$.asObservable();

    private updatedUser$$ = new Subject<UpdatedUserModel>();
    public updatedUser$ = this.updatedUser$$.asObservable();

    private deletedUser$$ = new Subject<boolean>();
    public deletedUser$ = this.deletedUser$$.asObservable();

    constructor(
        private httpClient: HttpClient,
        private notificationsService: NotificationsService
    ) { }

    public getUser(id: number): void {
        this.httpClient.get<any>(`https://reqres.in/api/users/${id}`).subscribe((res) => {
            const user = {
                id: res.data.id,
                email: res.data.email,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                avatar: res.data.avatar
            } as UserModel;

            this.user$$.next(user);
        });
    }

    public updateUser(id: number, name: string, job: string): void {
        this.httpClient.put<any>(`https://reqres.in/api/users/${id}`, {
            name,
            job
        }).subscribe((user: UpdatedUserModel) => {
            this.updatedUser$$.next(user);
            this.notificationsService.success(NotificationsModel.UserUpdatedSuccessfully);
        });
    }

    public deleteUser(id: number): void {
        this.httpClient.delete<any>(`https://reqres.in/api/users/${id}`).subscribe(() => {
            this.deletedUser$$.next(true);
            this.notificationsService.success(NotificationsModel.UserDeletedSuccessfully);
        });
    }
}
