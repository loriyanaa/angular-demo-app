import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'ums-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent {
  public error$: Observable<string> = this.authService.error$;

  constructor(private authService: AuthService) { }

  public onSubmit(formData: any): void {
    this.authService.login(formData);
  }
}
