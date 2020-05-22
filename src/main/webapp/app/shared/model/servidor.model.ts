export interface IServidor {
  id?: number;
  nome?: string;
}

export class Servidor implements IServidor {
  constructor(public id?: number, public nome?: string) {}
}
