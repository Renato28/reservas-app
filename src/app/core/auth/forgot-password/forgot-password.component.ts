import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  send() {
    if (this.form.invalid) return;

    this.loading = true;

    this.authService.forgotPassword(this.form.value.email!)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('Um link de recuperação foi enviado para o seu email.')
          this.router.navigate(['/login']);
        },
        error: () => {
          this.loading = false;
          alert('Erro ao enviar email');
        }
      });
  }

}
