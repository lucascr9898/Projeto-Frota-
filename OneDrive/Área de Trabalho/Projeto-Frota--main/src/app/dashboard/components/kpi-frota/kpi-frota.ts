import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * Card de um único indicador (KPI). O dashboard original tinha 4 blocos de
 * HTML quase idênticos, só trocando ícone, cor e número — clássico sinal de
 * "isso devia ser um componente reaproveitado em loop", em vez de copiado
 * e colado 4 vezes.
 *
 * Em vez de repetir <div class="kpi-card">...</div> quatro vezes no
 * dashboard.html, agora é só:
 *   <app-kpi-frota icone="local_shipping" cor="azul" valor="8" label="Veículos na frota" />
 * uma vez para cada KPI.
 */
@Component({
  selector: 'app-kpi-frota',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './kpi-frota.html',
  styleUrl: './kpi-frota.css',
})
export class KpiFrotaComponent {
  // Nome do ícone do Material Icons (ex: 'local_shipping', 'check_circle').
  @Input({ required: true }) icone = '';

  // Controla a cor de fundo do ícone. Usamos union type (em vez de string
  // solta) para o TypeScript avisar em tempo de build se alguém digitar
  // "vermelo" errado, por exemplo.
  @Input({ required: true }) cor: 'azul' | 'verde' | 'laranja' | 'vermelho' = 'azul';

  // Aceita number (ex: 8) ou string (caso já venha formatado, como "12%").
  @Input({ required: true }) valor: number | string = 0;

  @Input({ required: true }) label = '';
}
