import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { UserModel } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private users$$ = new BehaviorSubject<UserModel[]>([]);
    public users$ = this.users$$.asObservable();

    constructor(private httpClient: HttpClient) { }

    public getUsers(pageIndex: number): void {
        this.httpClient.get<any>(`https://reqres.in/api/users?delay=3&page=${pageIndex}`).subscribe((res) => {
            const users = res.data.map(el => {
                return {
                    id: el.id,
                    email: el.email,
                    firstName: el.first_name,
                    lastName: el.last_name,
                    avatar: el.avatar,
                    name: `${el.first_name} ${el.last_name}`
                } as UserModel;
            });

            this.users$$.next(users);
        });
    }
}
