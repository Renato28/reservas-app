import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteRequest } from 'src/app/core/models/cliente-request.model';
import { QuartoRequest } from 'src/app/core/models/quarto-request.model';
import { ReservaRequest } from 'src/app/core/models/reserva-request.model';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { QuartoService } from 'src/app/core/services/quarto/quarto.service';
import { ReservaService } from 'src/app/core/services/reserva/reserva.service';

@Component({
  selector: 'app-reservas-form',
  templateUrl: './reservas-form.component.html',
  styleUrls: ['./reservas-form.component.css']
})
export class ReservasFormComponent implements OnInit {

  reservaForm: FormGroup = new FormGroup({});
  submitting: boolean = false;

  clientes: ClienteRequest[] = [];
  quartos: QuartoRequest[] = [];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private quartoService: QuartoService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      clienteId: [null, Validators.required],
      quartoId: [null, Validators.required],
      dataCheckIn: ['', Validators.required],
      dataCheckOut: ['', Validators.required]
    });

    this.clienteService.listar().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Erro ao carregar clientes', err)
    });

    this.quartoService.listar().subscribe({
      next: (data) => (this.quartos = data),
      error: (err) => console.error('Erro ao carregar os quartos', err)
    });
  }

  submitForm(): void {
    if (this.reservaForm?.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const reserva: ReservaRequest = this.reservaForm?.value;

    this.reservaService.cadastrar(reserva).subscribe({
      next: () => {
        this.toastService.info('Reserva cadastrada com sucesso!');
        this.router.navigate(['/reservas']);
      },
      error: (err) => {
        this.toastService.error('Erro ao cadastrar reserva!');
        this.submitting = false;
      }
    });
  }

   get f() {
    return this.reservaForm.controls;
  }
}
