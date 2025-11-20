import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegistroUsuarioRequest } from '../../models/registro-usuario-request.model';

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
      alert("As senhas não coincidem")
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
        alert("Usuario registrado com sucesso!");
        this.router.navigate(['/login']);
        
      },
      error: () => {
        this.loading = false;
        alert("Erro ao registrar usuário")
      }
    });
    
  }

}
