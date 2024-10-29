import { Component, inject } from '@angular/core';
import { ReservasService } from '../core/services/reservas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [],
  providers: [],
})
export class HomeComponent {
  private readonly reservaService = inject(ReservasService);

  findAll() {
    this.reservaService.findAll().subscribe((data) => {
      console.log(data);
    });
  }
}
