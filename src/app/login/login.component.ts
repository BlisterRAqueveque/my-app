import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);

  isLoading = false;

  login() {
    this.isLoading = true;
    this.loginService.login();

    const data = firstValueFrom(this.loginService.$datos);

    data.then();

    this.loginService.usuario.value;

    const sub = this.loginService.$datos.subscribe((data) => {
      console.log(data);
    });

    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 1500);

    sub.unsubscribe();
  }
}
