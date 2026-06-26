// veiculos.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardOverviewExample } from '../cards/cards';
import { SidenavResponsiveExample } from '../shared/sidebar/sidebar';
import { FrotaService } from '../core/services/frota.service';

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [CommonModule, CardOverviewExample, SidenavResponsiveExample],
  templateUrl: './veiculos.html',
  styleUrl: './veiculos.css',
})
export class Veiculos {

  // Mesma fonte de dados usada nos KPIs do Dashboard
  protected readonly frota = inject(FrotaService);
}
