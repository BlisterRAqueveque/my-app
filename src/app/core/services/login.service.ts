import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';

export interface LoginResponse {
  token: {
    access_token: string;
    token_type: string;
    expires_in_ms: number;
  };
  usuario: UsuarioD;
}

export interface UsuarioD {
  id: number;
  usuario: string;
  nombre: string;
  apellido: string;
  dni: number;
  competencia: string;
  fecha_nacimiento: Date;
  clave: string;
  push_token: string;
  correo: string;
  telefono: number;
  localidad: string;
  prefered_language: string;
  activo: number;
  fecha_hora_carga: Date;
  imagen_perfil: string;
  superadmin: number;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  //constructor(private readonly http: HttpClient) {}
  private readonly http = inject(HttpClient);
  // URL de nuestra API Rest
  private readonly url = 'http://localhost:3030/api/';

  login(usuario: string, clave: string) {
    const direction = this.url + 'usuarios/auth/login/';
    return this.http
      .post<{ ok: boolean; result: LoginResponse; msg: string }>(direction, {
        usuario,
        clave,
      })
      .pipe(
        catchError((e) => {
          throw new Error(e);
        }),
        tap((data) => {
          localStorage.setItem('x-token', data.result.token.access_token);
        }),
        map((data) => data.result.usuario)
      );
  }
}
