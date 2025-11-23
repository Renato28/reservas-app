import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarCollapsed = false;

  constructor(private authService: AuthService) {
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  isLoggedIn(): boolean {
    return this.authService.isLogged();
  }

  OnLogout() {
    this.authService.logout();
  }
}
