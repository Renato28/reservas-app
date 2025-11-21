import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RegistroUsuarioRequest } from '../../models/registro-usuario-request.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-usuario',
  templateUrl: './register-usuario.component.html',
  styleUrls: ['./register-usuario.component.css']
})
export class RegisterUsuarioComponent implements OnInit {

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmSenha: ['', Validators.required]
  });

  registrar() {
    if (this.form.invalid) return;

    if (this.form.value.senha !== this.form.value.confirmSenha) {
      this.toastService.error("As senhas não coincidem");
      return;
    }

    this.loading = true;

    const novoUsuario: RegistroUsuarioRequest = {
      nome: this.form.value.nome!,
      email: this.form.value.email!,
      senha: this.form.value.senha!
    };

    this.authService.registrar(novoUsuario).subscribe({

      next: () => {
        this.loading = false;
        this.toastService.success("Usuário registrado com sucesso!");
        this.router.navigate(['/login']);
        
      },
      error: () => {
        this.loading = false;
        this.toastService.error("Erro ao registrar usuário");
      }
    });
    
  }

}
