import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

export type StatusVeiculo = 'Disponível' | 'Em Viagem' | 'Manutenção';

export interface Carro {
  placa: string;
  modelo: string;
  marca: string;
  descricao: string;
  status: StatusVeiculo;
  capacidadeKg: number;
}

const IMAGEM_PADRAO = 'https://production.autoforce.com/uploads/version/profile_image/14078/comprar-mercedes-amg-sl-63-s-e-performance-25-26_58e217931b.png';

/**
 * @title Card overview
 */
@Component({
  selector: 'card-overview-example',
  standalone: true,
  templateUrl: 'cards.html',
  styleUrl: 'cards.css',
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class CardOverviewExample {
  imagemPadrao = IMAGEM_PADRAO;

  @Input() carros: Carro[] = [];

  statusClasse(status: StatusVeiculo): string {
    switch (status) {
      case 'Disponível': return 'status-disponivel';
      case 'Em Viagem': return 'status-viagem';
      case 'Manutenção': return 'status-manutencao';
    }
  }
}