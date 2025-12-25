import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioRequest } from 'src/app/core/models/usuario-request.model';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.css']
})
export class CadastroUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastService: ToastrService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      perfil: ['', Validators.required]
    });
  }

  invalid(field: string) {
    const control = this.usuarioForm.get(field);
    return control?.invalid && control?.touched;
  }

  cadastrar() {
      if (this.usuarioForm.valid) {
        const usuario: UsuarioRequest = this.usuarioForm.value;
  
        this.usuarioService.cadastrar(usuario).subscribe({
          next: () => {
            this.toastService.info('Usuário cadastrado com sucesso!');
            this.router.navigate(['/usuarios']);
          },
          error: () => this.toastService.error('Erro ao cadastrar o usuario')
        });
      }
    }

}
