import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'its-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  //* Tipo de valor del input
  @Input() type: string = 'text';
  //* Nombre del input
  @Input() name: string = '';
  //* Placeholder del input
  @Input() placeholder: string = 'Ingrese un placeholder';
  //* ID del input
  @Input() id: string = '';
  // * Muestra o no el icono de la contraseña
  @Input() showIcon: boolean = false;

  value = model<string>();

  icon = 'eye.svg';
  showPassword() {
    switch (this.type) {
      case 'password': {
        this.type = 'text';
        this.icon = 'eye-slash.svg';
        break;
      }
      case 'text': {
        this.type = 'password';
        this.icon = 'eye.svg';
        break;
      }
      default: {
        this.type = 'password';
        this.icon = 'eye.svg';
      }
    }
  }
}
