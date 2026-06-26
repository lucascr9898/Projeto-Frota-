import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Viagem, ViagemRecente, StatusViagem } from '../../../core/models/logistica.models';


@Component({
  selector: 'app-volumetria-viagens',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './volumetria-viagens.html',
  styleUrl: './volumetria-viagens.css',
})
export class VolumetriaViagensComponent {
  @Input({ required: true }) viagensAgendadas = 0;
  @Input({ required: true }) viagensEmAndamento = 0;
  @Input({ required: true }) viagensFinalizadas = 0;
  @Input({ required: true }) viagensRecentes: ViagemRecente[] = [];

  statusViagemClasse(status: StatusViagem): string {
    switch (status) {
      case 'Agendada': return 'tag-agendada';
      case 'Em Viagem': return 'tag-viagem';
      case 'Finalizada': return 'tag-finalizada';
    }
  }
}
