import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    DashboardCardComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
