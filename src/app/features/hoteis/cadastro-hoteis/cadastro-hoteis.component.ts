import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelRequest } from 'src/app/core/models/hotel-request.model';
import { CorreiosService } from 'src/app/core/services/correios/correios.service';
import { HotelService } from 'src/app/core/services/hotel/hotel.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-hoteis.component.html',
  styleUrls: ['./cadastro-hoteis.component.css']
})
export class CadastroHotelComponent implements OnInit {

  hotelForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private correioService: CorreiosService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],

      endereco: this.fb.group({
        cep: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
      })
    });
  }

  buscarCep() {
    const cep = this.hotelForm.get('endereco.cep')?.value;

    if (!cep || cep.length < 8) return;

    this.correioService.buscarCep(cep).subscribe({
      next: (data) => {
        this.hotelForm.patchValue({
          endereco: {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }
        });
      }
    })
  }

  invalid(field: string) {
    const control = this.hotelForm.get(field);
    return control?.invalid && control?.touched;
  }

  cadastrar() {

    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    const hotel: HotelRequest = this.hotelForm.value;

    this.hotelService.cadastrar(hotel).subscribe({
      next: () => {
        this.toastService.success('Hotel cadastrado com sucesso!');
        this.router.navigate(['/hoteis']);
      },
      error: () => {
        this.toastService.error('Erro ao cadastrar o hotel');
      }
    });
  }
}
