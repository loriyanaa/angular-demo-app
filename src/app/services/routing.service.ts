import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RoutingService {

    constructor(private router: Router) { }

    public navigateToLogin(): Promise<boolean> {
        return this.router.navigate(['/']);
    }

    public navigateToUsersPage(): Promise<boolean> {
        return this.router.navigate(['/users']);
    }
}
