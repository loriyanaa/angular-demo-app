import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationsService } from '../../../core/services/notifications.service';
import { RoutingService } from '../../../core/services/routing.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn$$ = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedIn$$.asObservable();

    constructor(
        private httpClient: HttpClient,
        private routingService: RoutingService,
        private notificationsService: NotificationsService
    ) { }

    public login(loginData): void {
        this.httpClient.post('https://reqres.in/api/login', { email: loginData.email, password: loginData.password })
            .pipe(catchError(resError => {
                this.notificationsService.error(resError.error.error);

                return of(null);
            }))
            .subscribe(res => {
                if (res) {
                    this.setAccessToken(res.token);
                    this.isLoggedIn$$.next(true);
                    this.routingService.navigateToHome();
                }
            });
    }

    public register(registerData): void {
        this.httpClient.post('https://reqres.in/api/register', { email: registerData.email, password: registerData.password })
            .pipe(catchError(resError => {
                this.notificationsService.error(resError.error.error);

                return of(null);
            }))
            .subscribe(res => {
                if (res) {
                    this.setAccessToken(res.token);
                    this.isLoggedIn$$.next(true);
                    this.routingService.navigateToHome();
                }
            });
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.isLoggedIn$$.next(false);
        this.routingService.navigateToHome();
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        if (token) {
            this.isLoggedIn$$.next(true);
            return true;
        } else {
            this.isLoggedIn$$.next(false);
            return false;
        }
    }

    private setAccessToken(token: string): void {
        localStorage.setItem('token', token);
    }
}
