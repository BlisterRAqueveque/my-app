//? Al usar un objeto genérico, se lo podemos especificar
//? cuando traemos la interfaz
export interface ResponseI<T = any> {
  ok: boolean;
  result: T;
  msg: string;
}

