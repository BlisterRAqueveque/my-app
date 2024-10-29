import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { ResponseI } from '../models/response.model';
import { CookieService } from 'ngx-cookie-service';
import { TOKEN } from '../constants/service-keys';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly http = inject(HttpClient);
  // URL de nuestra API Rest
  private readonly url = 'http://localhost:3000/api/';

  login(email: string, pass: string) {
    const direction = this.url + 'usuarios/auth/login/';
    return this.http
      .post<ResponseI<string>>(direction, {
        email,
        pass,
      })
      .pipe(
        catchError((e) => {
          throw new Error(e);
        }),
        tap((data) => this.saveTokenInCookies(data)),
        map((data) => {
          data.result;
        })
      );
  }

  // Inyectamos el servicio de cookies:
  private readonly cookieService = inject(CookieService);
  private saveTokenInCookies(data: ResponseI<string>): void {
    // Traemos el TOKEN de las importaciones
    this.cookieService.set(TOKEN, data.result, undefined, '/');
    //? Después de obtener el token, redireccionamos
    this.router.navigate(['/home']);
  }
  private removeUserFromCookie() {
    // Setea la cookie como un valor vacío
    this.cookieService.set(TOKEN, '', undefined, '/');
  }

  // Inyectamos el Router para usar las funciones que nos dejan navegar por la aplicación
  private readonly router = inject(Router);
  /**
   * @description
   * Todas las funciones para borrar las credenciales del usuario al deslogearse
   *
   */
  logout() {
    this.removeUserFromCookie();
    // Navega al usuario al login
    this.router.navigate(['login'], { replaceUrl: true });
  }

  /**
   * @description
   * Comprueba si el token es válido, o no
   */
  checkToken(token: string) {
    return this.http.post<ResponseI<any>>(this.url, { token }).pipe(
      catchError((e) => {
        throw new Error(e);
      }),
      map((data) => data.ok)
    );
  }
}
