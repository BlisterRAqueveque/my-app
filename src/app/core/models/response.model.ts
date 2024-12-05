export interface ResponseInterface<T = any> {
  ok: boolean;
  result: T;
  msg: string;
}
