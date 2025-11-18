import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/componentes/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/auth/reset-password/reset-password.component';
import { RegisterUsuarioComponent } from './core/auth/register-usuario/register-usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: RegisterUsuarioComponent},

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
