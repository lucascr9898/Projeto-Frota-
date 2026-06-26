// dashboard.ts
import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SidenavResponsiveExample } from '../shared/sidebar/sidebar';
import { FrotaService } from '../core/services/frota.service';
import { KpiFrotaComponent } from './components/kpi-frota/kpi-frota';
import { StatusFrotaComponent } from './components/status-frota/status-frota';
import { VolumetriaViagensComponent, ViagemRecente } from './components/volumetria-viagens/volumetria-viagens';
import { AlertasSistemaComponent, AlertaCnh, AlertaManutencao } from './components/alertas-sistema/alertas-sistema';

/**
 * Dashboard agora é um componente "orquestrador" (também chamado de
 * componente container/smart component): ele busca os dados (do
 * FrotaService e dos arrays mockados abaixo) e distribui esses dados para
 * os componentes filhos via @Input(). Quem desenha cada pedaço da tela é o
 * componente filho correspondente — o Dashboard não sabe mais como um KPI
 * é desenhado, por exemplo, só sabe que existe um <app-kpi-frota>.
 *
 * Vantagem prática disso pro estágio: se pedirem para mudar só o card de
 * Alertas, você abre uma pasta (alertas-sistema/) com 3 arquivos pequenos,
 * em vez de caçar o trecho certo dentro de um dashboard.html de 150+ linhas.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DatePipe,
    MatIconModule,
    SidenavResponsiveExample,
    KpiFrotaComponent,
    StatusFrotaComponent,
    VolumetriaViagensComponent,
    AlertasSistemaComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  // Fonte de dados compartilhada com a página de Veículos
  protected readonly frota = inject(FrotaService);

  dataAtual = new Date();

  // 3.2 — Volumetria de viagens
  viagensAgendadas = 14;
  viagensFinalizadas = 37;

  // 3.2 — Alertas do sistema (CNH e manutenção)
  alertasCnh: AlertaCnh[] = [
    { nome: 'Carlos Andrade', cnh: '02938475610', validade: new Date('2026-07-02'), diasRestantes: 7 },
    { nome: 'Marcos Lima', cnh: '01827364590', validade: new Date('2026-07-09'), diasRestantes: 14 },
    { nome: 'Juliana Pires', cnh: '03746281950', validade: new Date('2026-06-30'), diasRestantes: 5 },
  ];

  alertasManutencao: AlertaManutencao[] = [
    { placa: 'SDK1B85', modelo: 'BMW Série 3', motivo: 'Revisão programada de freios e suspensão.' },
    { placa: 'TCR8H60', modelo: 'VW T-Cross', motivo: 'Troca de óleo e filtros pendente.' },
  ];

  viagensRecentes: ViagemRecente[] = [
    { codigo: 'RT-1042', origem: 'São Paulo', destino: 'Campinas', motorista: 'Marcos Lima', status: 'Em Viagem' },
    { codigo: 'RT-1041', origem: 'Limeira', destino: 'Piracicaba', motorista: 'Bruno Faria', status: 'Em Viagem' },
    { codigo: 'RT-1038', origem: 'Sorocaba', destino: 'Itu', motorista: 'Juliana Pires', status: 'Finalizada' },
    { codigo: 'RT-1035', origem: 'Campinas', destino: 'São Paulo', motorista: 'Carlos Andrade', status: 'Agendada' },
  ];

  // statusViagemClasse() saiu de aqui — agora mora dentro de
  // VolumetriaViagensComponent, junto do template que efetivamente usa essa
  // classe CSS.
}
