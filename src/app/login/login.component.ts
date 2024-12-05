import { Component, inject } from '@angular/core';
import { LoginService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // constructor(private readonly loginService: LoginService) {}
  private readonly loginService = inject(LoginService);

  usuario!: string;
  clave!: string;

  login() {
    const a = this.loginService.login(this.usuario, this.clave).subscribe({
      error: (e: any) => {
        console.log(e);
        alert('Error de login ' + JSON.stringify(e));
      },
    });
  }
}
