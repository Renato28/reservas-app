import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/core/services/reserva/reserva.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent implements OnInit {

  reservas: any[] = [];
  loading = true;

  constructor(private reservaService: ReservaService,
              private toastService: ToastrService 
  ) {}

  ngOnInit(): void {
    this.buscarReservas();
  }

  buscarReservas() {
    this.reservaService.listar().subscribe({
      next: (data) => {
        this.reservas = data;
        this.loading = false;
      },
      error: () => this.toastService.error('Erro ao buscar reservas')
    });
  }

  cancelar(id: number) {
    if (!confirm('Deseja realmente cancelar esta reserva?')) return;

    this.reservaService.cancelar(id).subscribe({
      next: () => {
        this.toastService.info('Reserva cancelada com sucesso');
        this.buscarReservas();
      },
      error: () => this.toastService.error('Erro ao cancelar reserva')
    })
  }

  confirmar(id: number) {
    if (!confirm('Deseja realmente confirmar esta reserva?')) return;

    this.reservaService.confirmarReserva(id).subscribe({
      next: () => {
        this.toastService.info('Reserva confirmada com sucesso');
        this.buscarReservas();
      },
      error: () => this.toastService.error('Erro ao confirmar reserva')
    })
  }
}
