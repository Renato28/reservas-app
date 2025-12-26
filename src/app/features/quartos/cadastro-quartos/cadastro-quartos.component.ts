import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuartoRequest } from 'src/app/core/models/quarto-request.model';
import { StatusQuarto } from 'src/app/core/models/status-quarto.enum';
import { TipoQuarto } from 'src/app/core/models/tipo-quarto.enum';
import { HotelService } from 'src/app/core/services/hotel/hotel.service';
import { QuartoService } from 'src/app/core/services/quarto/quarto.service';

@Component({
  selector: 'app-cadastro-quartos',
  templateUrl: './cadastro-quartos.component.html',
  styleUrls: ['./cadastro-quartos.component.css']
})
export class CadastroQuartosComponent implements OnInit {

  quartoForm!: FormGroup;
  submitting = false;
  hoteis: any[] = [];

  tiposQuarto = Object.values(TipoQuarto);
  statusOptions = Object.values(StatusQuarto);

  constructor(
    private fb: FormBuilder,
    private quartoService: QuartoService,
    private hotelService: HotelService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.hotelService.listar().subscribe(res => this.hoteis = res);

    this.quartoForm = this.fb.group({
      numero: ['', Validators.required],
      tipo: ['', Validators.required],
      precoDiaria: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      hotelId: ['', Validators.required]
    });
  }

  invalid(field: string) {
    const control = this.quartoForm.get(field);
    return control?.invalid && control?.touched;
  }

  cadastrar() {
    if (this.quartoForm.invalid) {
      this.quartoForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const quarto: QuartoRequest = this.quartoForm.value;

    this.quartoService.cadastrar(quarto).subscribe({
      next: () => {
        this.toastService.success('Quarto cadastrado com sucesso!');
        this.router.navigate(['/quartos']);
      },
      error: () => {
        this.toastService.error('Erro ao cadastrar o quarto');
        this.submitting = false;
      }
    });
  }

  get f() {
    return this.quartoForm.controls;
  }

}
