import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token!: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  form = this.fb.group({
    novaSenha: ['', Validators.required]
  });

  reset() {
    if (this.form.invalid) return;

    this.loading = true;

    this.authService.resetPassword(this.token, this.form.value.novaSenha!)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('Senha alterada com sucesso!');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.loading = false;
          alert('Token inválido ou expirado.')
        }
      })
  }

}
