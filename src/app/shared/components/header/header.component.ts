import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleDark = new EventEmitter<void>();
  onToggleDark() { this.toggleDark.emit(); }
}
