import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

/**
 * Card "Status da Frota": barra de progresso segmentada + legenda + link
 * para a página de Veículos.
 *
 * Os 3 percentuais (disponível / em viagem / manutenção) continuam vindo do
 * FrotaService, mas agora chegam até aqui via @Input(), passados pelo
 * Dashboard. Este componente não conhece o FrotaService — ele só sabe
 * desenhar números que recebe. Isso é bom porque, se um dia os percentuais
 * vierem de outro lugar (uma API, por exemplo), este componente nem precisa
 * mudar.
 */
@Component({
  selector: 'app-status-frota',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './status-frota.html',
  styleUrl: './status-frota.css',
})
export class StatusFrotaComponent {
  @Input({ required: true }) percDisponiveis = 0;
  @Input({ required: true }) percEmViagem = 0;
  @Input({ required: true }) percManutencao = 0;
}
