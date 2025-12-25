import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/componentes/login/login.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/auth/reset-password/reset-password.component';
import { RegisterUsuarioComponent } from './core/auth/register-usuario/register-usuario.component';
import { DashboardComponent } from './core/componentes/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ReservasFormComponent } from './features/reservas/reservas-form/reservas-form/reservas-form.component';
import { CadastroClienteComponent } from './features/clientes/cadastro-cliente/cadastro-cliente.component';
import { CadastroQuartosComponent } from './features/quartos/cadastro-quartos/cadastro-quartos.component';
import { CadastroHotelComponent } from './features/hoteis/cadastro-hoteis/cadastro-hoteis.component';
import { CadastroUsuariosComponent } from './features/usuarios/cadastro-usuarios/cadastro-usuarios.component';

const routes: Routes = [
  // ROTAS PÚBLICAS
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: RegisterUsuarioComponent },

  // ROTAS PROTEGIDAS
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },

  { path: 'reservas', component: ReservasFormComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: CadastroClienteComponent, canActivate: [AuthGuard] },
  { path: 'quartos', component: CadastroQuartosComponent, canActivate: [AuthGuard] },
  { path: 'hoteis', component: CadastroHotelComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: CadastroUsuariosComponent, canActivate: [AuthGuard] },

  // REDIRECIONAMENTO PADRÃO → LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // NOT FOUND → LOGIN
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
