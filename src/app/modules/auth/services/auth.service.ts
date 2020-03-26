import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private error$$ = new BehaviorSubject<string>(null);
  public error$ = this.error$$.asObservable();

  private isLoggedIn$$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn$$.asObservable();

  constructor(private httpClient: HttpClient, public router: Router) { }

  public login(loginData): void {
    this.httpClient.post('https://reqres.in/api/login', { email: loginData.email, password: loginData.password })
      .pipe(catchError(responseError => {
        this.error$$.next(responseError.error.error);

        return of(null);
      }))
      .subscribe(res => {
        if (res) {
          this.setAccessToken(res.token);
          this.isLoggedIn$$.next(true);
          this.error$$.next(null);
          this.router.navigate(['/']);
        }
      }
    );
  }

  public register(registerData): void {
    this.httpClient.post('https://reqres.in/api/register', { email: registerData.email, password: registerData.password })
      .pipe(catchError(responseError => {
        this.error$$.next(responseError.error.error);

        return of(null);
      }))
      .subscribe(res => {
        if (res) {
          this.setAccessToken(res.token);
          this.isLoggedIn$$.next(true);
          this.error$$.next(null);
          this.router.navigate(['/']);
        }
      }
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn$$.next(false);
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return token ? true : false;
  }

  private setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
