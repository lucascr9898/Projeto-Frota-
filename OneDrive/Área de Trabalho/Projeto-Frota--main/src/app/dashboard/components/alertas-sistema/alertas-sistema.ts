import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// Esses tipos eram declarados dentro do dashboard.ts antes da separação.
// Ficam aqui agora porque são "propriedade" deste componente: é ele quem
// sabe o formato dos dados que recebe e exibe.
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

/**
 * Componente "burro" (dumb/presentational component).
 *
 * Ele não busca dados em nenhum service e não tem lógica própria — só recebe
 * arrays prontos via @Input() e exibe. Quem decide QUAIS alertas existem é o
 * componente pai (Dashboard). Essa separação facilita reaproveitar este card
 * de alertas em outra tela no futuro, se precisar.
 */
@Component({
  selector: 'app-alertas-sistema',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './alertas-sistema.html',
  styleUrl: './alertas-sistema.css',
})
export class AlertasSistemaComponent {

  @Input({ required: true }) cnhAlertas: AlertaCnh[] = [];
  @Input({ required: true }) manutencaoAlertas: AlertaManutencao[] = [];
}
