import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './tela-login.html',
  styleUrl: './tela-login.css'
})

export class LoginComponent {
  form: FormGroup;
  erro = false;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.erro = false;
    this.carregando = true;

    const { usuario, senha } = this.form.value;

    this.authService.login(usuario, senha).subscribe({
      next: (sessao) => {
        this.carregando = false;

        if (!sessao) {
          this.erro = true;
          return;
        }

        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.carregando = false;
        this.erro = true;
      }
    });
  }
}