import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ums-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() isLoggedIn: boolean;

  @Output() logout = new EventEmitter<any>();

  public onLogout(): void {
    this.logout.emit();
  }
}
