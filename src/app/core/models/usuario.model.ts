export interface UsuarioD {
  id: number;
  nombre: string;
  email: string;
  password: string;
  avatar: string;
  isActive?: boolean;
  rol: string;
}
