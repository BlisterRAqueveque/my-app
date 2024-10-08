import { Component, inject, Input } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [],
  providers: [],
})
export class HomeComponent {
  json = {
    id: 1,
    nombre: 'Juan',
  };

  hoy = new Date();

  @Input() id!: number;

  // constructor(private readonly homeService: HomeService) {}

  private readonly homeService = inject(HomeService);
}
