import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseI } from '../models/response.model';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  //* Inyectamos el HttpClient
  private readonly http = inject(HttpClient);
  //* Ruta de consulta a nuestra API Rest
  private readonly url = 'http://localhost:3000/api/reservas';

  findAll() {
    return this.http
      .get<ResponseI<any>>(this.url)
      .pipe(catchError((e) => throwError(() => new Error(e))));
  }
}
