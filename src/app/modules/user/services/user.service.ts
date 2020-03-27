import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../../users/models/user';
import { UpdatedUser } from '../models/updated-user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user$$ = new Subject<User>();
    public user$ = this.user$$.asObservable();

    private updatedUser$$ = new Subject<UpdatedUser>();
    public updatedUser$ = this.updatedUser$$.asObservable();

    constructor(private httpClient: HttpClient) { }

    public getUser(id: number): void {
        this.httpClient.get<any>(`https://reqres.in/api/users/${id}`).subscribe((res) => {
            const user = {
                id: res.data.id,
                email: res.data.email,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                avatar: res.data.avatar
            } as User;

            this.user$$.next(user);
        });
    }

    public updateUser(id: number, name: string, job: string): void {
        this.httpClient.put<any>(`https://reqres.in/api/users/${id}`, {
            name: name,
            job: job
        }).subscribe((user: UpdatedUser) => {
            this.updatedUser$$.next(user);
        });
    }
}
