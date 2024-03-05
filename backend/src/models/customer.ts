export default interface Cliente {
  id?: number;
  created_at?: Date;
  nome: string;
  email: string;
  telefone: string;
  coordenada_x: number;
  coordenada_y: number;
}
