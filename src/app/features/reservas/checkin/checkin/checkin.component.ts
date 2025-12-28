import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/core/services/reserva/reserva.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  formCheckin!: FormGroup;
  reserva: any = undefined;

  constructor(private fb: FormBuilder, 
              private reservaService: ReservaService,
              private toastService: ToastrService) { }

  buscarReserva() {
    const codigo = this.formCheckin.value.codigo;
    this.reservaService.buscarPorId(codigo).subscribe({
      next: (res) => this.reserva = res,
      error: () => this.reserva = null
    });
  }

  realizarCheckIn() {
    this.reservaService.realizarCheckIn(this.reserva.codigo).subscribe({
      next: () => this.toastService.info('Check-in realizado com sucesso!'),
    });
  }

  ngOnInit(): void {
    this.formCheckin = this.fb.group({
          codigo: [null, Validators.required],
        });
  }

}
