import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  usuario = new BehaviorSubject<string>('');
  $datos = this.usuario.asObservable();

  login() {
    this.$datos.subscribe((data) => {
      console.log(data);
    });
    console.log('Usuario logeado');
  }
}
