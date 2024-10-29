import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TOKEN } from '../constants/service-keys';
import { LoginService } from '../services/login.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  //? Inyectamos dependencias ---------------->
  const auth = inject(LoginService);
  const cookie = inject(CookieService);
  //? Inyectamos dependencias ---------------->
  // Obtenemos el token de las cookies
  const token = cookie.get(TOKEN);

  try {
    // Comprobamos mediante una consulta HTTP si el token es válido
    const ok = await firstValueFrom(auth.checkToken(token!));
    if (ok) {
      // Si es true, le dejamos pasar
      return ok;
    } else {
      // Caso contrario, lo deslogueamos
      auth.logout();
      // No permitimos el paso a la ruta
      return ok;
    }
  } catch (error) {
    //! En caso de error lo deslogueamos
    auth.logout();
    return false;
  }
};
