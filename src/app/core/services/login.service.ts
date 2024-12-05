import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseInterface } from '../models/response.model';
import { TOKEN } from '../constants/keys';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  //constructor(private readonly http: HttpClient) {}
  private readonly http = inject(HttpClient);

  private readonly cookieService = inject(CookieService);
  // URL de nuestra API Rest
  private readonly url = environment.api_url;

  login(email: string, pass: string) {
    const direction = this.url + 'usuarios/auth/login/';
    return this.http
      .post<ResponseInterface<string>>(direction, {
        email,
        pass,
      })
      .pipe(
        catchError((e) => {
          console.log(e);
          throw new Error(e);
        }),
        map((data) => data.result),
        tap((result) => {
          console.log(result);
          this.saveTokenInCookies(result);
        })
      );
  }

  private saveTokenInCookies(token: string) {
    console.log(token);
    this.cookieService.set(TOKEN, token, undefined, '/');
    this.router.navigate(['/home']);
  }

  private removeTokenFromCookies() {
    this.cookieService.set(TOKEN, '', undefined, '/');
  }

  private readonly router = inject(Router);
  logout() {
    this.removeTokenFromCookies();
    this.router.navigate(['login'], { replaceUrl: true });
  }

  /**
   * @description Comprueba la validez del token
   * @param token JWT Token
   * @returns ok | false
   */
  checkToken(token: string) {
    return this.http.post<ResponseInterface>(this.url, { token }).pipe(
      catchError((e) => throwError(() => new Error(e))),
      map((data) => data.ok)
    );
  }
}
