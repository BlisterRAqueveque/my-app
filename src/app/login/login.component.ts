import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  clave!: string;
  usuario!: string;

  login() {
    this.loginService.login(this.usuario, this.clave).subscribe({
      //! Solo manejaríamos lo errores de respuesta para comunicar
      //! al usuario de que es lo que paso mal
      error: (e) => {
        console.error(e);
      },
    });
  }
}
