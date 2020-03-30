import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RoutingService {

    constructor(private router: Router) { }

    navigateToLogin(): Promise<boolean> {
        return this.router.navigate(['/']);
    }

    navigateToUsersPage(): Promise<boolean> {
        return this.router.navigate(['/users']);
    }
}
