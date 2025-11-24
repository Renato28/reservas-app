import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteRequest } from 'src/app/core/models/cliente-request.model';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      documento: ['', Validators.required],
      tipoCliente: ['', Validators.required],
      tipoDocumento: ['', Validators.required]
    });
  }

  invalid(field: string) {
    const control = this.clienteForm.get(field);
    return control?.invalid && control?.touched;
  }

  cadastrar() {
    if (this.clienteForm.valid) {
      const cliente: ClienteRequest = this.clienteForm.value;

      this.clienteService.cadastrar(cliente).subscribe({
        next: () => {
          this.toastService.info('Cliente cadastrado com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: () => this.toastService.error('Erro ao cadastrar o cliente')
      });
    }
  }

}
