import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from 'src/app/core/services/reserva/reserva.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  formCheckout!: FormGroup;
    reserva: any = undefined;
  
    constructor(private fb: FormBuilder, 
                private reservaService: ReservaService,
                private toastService: ToastrService) { }
  
    buscarReserva() {
      const codigo = this.formCheckout.value.codigo;
      this.reservaService.buscarPorId(codigo).subscribe({
        next: (res) => this.reserva = res,
        error: () => this.reserva = null
      });
    }
  
    realizarCheckOut() {
      this.reservaService.realizarCheckOut(this.reserva.codigo).subscribe({
        next: () => this.toastService.info('Check-out realizado com sucesso!'),
      });
    }
  
    ngOnInit(): void {
      this.formCheckout = this.fb.group({
            codigo: [null, Validators.required],
          });
    }

}
