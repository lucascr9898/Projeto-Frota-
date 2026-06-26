// src/app/core/models/logistica.models.ts

/**
 * Estados permitidos para uma Viagem no sistema
 */
export type StatusViagem = 'Agendada' | 'Em Viagem' | 'Finalizada';

/**
 * Domínio de Veículos (Frota)
 */
export interface Veiculo {
  placa: string;
  modelo: string;
  marca: string;
  descricao?: string;
  status: 'Disponível' | 'Em Viagem' | 'Manutenção';
  capacidadeKg: number;
}

/**
 * Domínio de Motoristas
 */
export interface Motorista {
  id: string;
  nomeCompleto: string;
  cpf: string;
  cnh: string;
  categoriaCnh: string;
  validadeCnh: Date;
  status: 'Disponível' | 'Em Viagem';
}

/**
 * Domínio de Rotas
 */
export interface Rota {
  id: string;
  codigo: string;
  origem: string;
  destino: string;
  distanciaKm: number;
  pesoCargaKg: number;
}

/**
 * Domínio de Viagens (Objeto persistido no LocalStorage)
 */
export interface Viagem {
  id: string;
  veiculoPlaca: string;
  motoristaId: string;
  rotaId: string;
  progresso: number;
  status: StatusViagem; // Usa o tipo centralizado acima
}

/**
 * Projeções para a UI (Dashboard e Alertas)
 */
export interface ViagemRecente {
  codigo: string;
  origem: string;
  destino: string;
  motorista: string;
  status: StatusViagem;
}

export interface AlertaCnh {
  nome: string;
  cnh: string;
  validade: Date;
  diasRestantes: number;
}

export interface AlertaManutencao {
  placa: string;
  modelo: string;
  motivo: string;
}
