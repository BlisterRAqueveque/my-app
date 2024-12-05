export interface UsuarioInterface {
  id: number;

  nombre: string;
  email: string;
  password?: string;
  avatar: string;

  isActive?: boolean;

  //reservas: ReservaDto[];

  rol: string;
}
