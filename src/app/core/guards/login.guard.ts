import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { TOKEN } from '../constants/keys';
import { firstValueFrom } from 'rxjs';

export const loginGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);
  const cookieService = inject(CookieService);

  const token = cookieService.get(TOKEN);

  try {
    if (token) {
      const isValid = await firstValueFrom(loginService.checkToken(token));
      if (isValid) return true;
      else {
        loginService.logout();
        return false;
      }
    } else {
      loginService.logout();
      return false;
    }
  } catch (err) {
    console.error(err);
    loginService.logout();
    return false;
  }
};
