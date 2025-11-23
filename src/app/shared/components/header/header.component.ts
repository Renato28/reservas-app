import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleDark = new EventEmitter<void>();
  onToggleDark() { this.toggleDark.emit(); }
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  OnLogout() {
    this.logoutEvent.emit();
  }
}
