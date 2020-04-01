import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ExternalLinksModel } from '../../../shared/constants/external-links.model';
import { NotificationsModel } from '../../../shared/constants/notifications.model';
import { RoutingService } from '../../../core/services/routing.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { UserModel } from '../../users/models/user.model';
import { UpdatedUserModel } from '../models/updated-user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private lastPageIndex: number;

    private users$$ = new BehaviorSubject<UserModel[]>([]);
    public users$ = this.users$$.asObservable();

    private user$$ = new BehaviorSubject<UserModel>(null);
    public user$ = this.user$$.asObservable();

    private userDeleted$$ = new BehaviorSubject<boolean>(false);
    public userDeleted$ = this.userDeleted$$.asObservable();

    private userAdded$$ = new BehaviorSubject<boolean>(false);
    public userAdded$ = this.userAdded$$.asObservable();

    constructor(
        private httpClient: HttpClient,
        private notificationsService: NotificationsService,
        private routingService: RoutingService
    ) { }

    public getUsers(pageIndex: number): void {
        this.lastPageIndex = pageIndex;

        this.httpClient.get<any>(`https://reqres.in/api/users?delay=3&page=${++pageIndex}`)
            .pipe(catchError((resError) => {
                const users: UserModel[] = this.users$$.getValue();
                if (users.length > 0) {
                    this.users$$.next(users);
                } else {
                    this.notificationsService.error(resError.message);
                }

                return of(null);
            })).subscribe((res) => {
                if (res) {
                    const users = res.data.map(el => {
                        return {
                            id: el.id,
                            email: el.email,
                            avatar: el.avatar,
                            name: `${el.first_name} ${el.last_name}`
                        } as UserModel;
                    });

                    this.users$$.next(users);
                }
            });
    }

    public getUser(id: number): void {
        this.httpClient.get<any>(`https://reqres.in/api/users/${id}`)
            .pipe(catchError((resError) => {
                const user: UserModel = this.users$$.getValue().find(u => u.id === id);
                if (user) {
                    this.user$$.next(user);
                } else {
                    this.notificationsService.error(resError.message);
                }

                return of(null);
            })).subscribe((res) => {
                if (res) {
                    const user = {
                        id: res.data.id,
                        email: res.data.email,
                        name: `${res.data.first_name} ${res.data.last_name}`,
                        avatar: res.data.avatar,
                        job: 'Angular Guru'
                    } as UserModel;

                    this.user$$.next(user);
                }
            });
    }

    public updateUser(user: UpdatedUserModel): void {
        this.httpClient.put<UpdatedUserModel>(`https://reqres.in/api/users/${user.id}`, {
            name: user.name,
            job: user.job
        }).pipe(catchError((resError) => {
            this.notificationsService.error(resError.message);

            return of(null);
        })).subscribe((res: UpdatedUserModel) => {
            if (res) {
                const selectedUser = this.user$$.getValue();
                const updatedUser: UserModel = {
                    ...selectedUser,
                    name: res.name,
                    job: res.job,
                    email: user.email,
                    updatedAt: res.updatedAt
                };

                this.user$$.next(updatedUser);
                this.notificationsService.success(NotificationsModel.UserUpdatedSuccessfully);
            }
        });
    }

    public addUser(user: UpdatedUserModel): void {
        this.httpClient.post<UpdatedUserModel>(`https://reqres.in/api/users`, {
            name: user.name,
            job: user.job
        }).pipe(catchError((resError) => {
            this.notificationsService.error(resError.message);

            return of(null);
        })).subscribe((res: UpdatedUserModel) => {
            if (res) {
                const userToAdd: UserModel = {
                    id: +res.id,
                    name: res.name,
                    job: res.job,
                    updatedAt: res.updatedAt,
                    email: user.email,
                    avatar: ExternalLinksModel.DefaultUserImage
                };

                this.userAdded$$.next(true);

                const currentUsers = this.users$$.getValue();
                const updatedUsers = [ ... currentUsers, userToAdd ];
                this.users$$.next(updatedUsers);

                this.notificationsService.success(NotificationsModel.UserAddedSuccessfully);
                this.routingService.navigateToUsers(this.lastPageIndex, true);
            }
        });
    }

    public deleteUser(id: number): void {
        this.httpClient.delete<any>(`https://reqres.in/api/users/${id}`)
            .pipe(catchError((resError) => {
                this.notificationsService.error(resError.message);

                return of(new Error());
            })).subscribe((res) => {
                if (res === null) {
                    this.userDeleted$$.next(true);

                    const updatedUsers = this.users$$.getValue().filter(user => user.id !== id);
                    this.users$$.next(updatedUsers);

                    this.notificationsService.success(NotificationsModel.UserDeletedSuccessfully);
                    this.routingService.navigateToUsers(this.lastPageIndex, true);
                }
            });
    }
}
