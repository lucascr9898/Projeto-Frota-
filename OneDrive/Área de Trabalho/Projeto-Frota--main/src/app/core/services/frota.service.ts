import { Injectable, computed, signal } from '@angular/core';
// 1. Importa o tipo do Carro/Veículo direto da sua nova pasta de modelos
import { Veiculo } from '../models/logistica.models';

@Injectable({
  providedIn: 'root'
})
export class FrotaService {
  // Fonte única de dados da frota (Usa a interface centralizada do seu model)
  private readonly _carros = signal<Veiculo[]>([
    { placa: 'BRA2E19', modelo: 'C 200 AMG Line', marca: 'Mercedes-Benz', descricao: 'Sedã híbrido com acabamento esportivo e tração 9G-TRONIC.', status: 'Disponível', capacidadeKg: 450 },
    { placa: 'RJK4D71', modelo: 'Civic Touring', marca: 'Honda', descricao: 'Sedã médio com motor turbo e pacote completo de segurança.', status: 'Em Viagem', capacidadeKg: 420 },
    { placa: 'PBV9A23', modelo: 'Corolla Altis', marca: 'Toyota', descricao: 'Sedã híbrido com excelente economia e confiabilidade.', status: 'Disponível', capacidadeKg: 430 },
    { placa: 'SDK1B85', modelo: 'Série 3', marca: 'BMW', descricao: 'Sedã premium com dinâmica esportiva e interior refinado.', status: 'Manutenção', capacidadeKg: 410 },
    { placa: 'QML7C32', modelo: 'A4', marca: 'Audi', descricao: 'Sedã com tecnologia quattro e acabamento sofisticado.', status: 'Disponível', capacidadeKg: 440 },
    { placa: 'HBX5F94', modelo: 'HB20', marca: 'Hyundai', descricao: 'Hatch compacto, ágil e econômico para o dia a dia.', status: 'Em Viagem', capacidadeKg: 380 },
    { placa: 'OPL3G16', modelo: 'Onix Plus', marca: 'Chevrolet', descricao: 'Sedã compacto com ótimo custo-benefício e baixo consumo.', status: 'Disponível', capacidadeKg: 400 },
    { placa: 'TCR8H60', modelo: 'T-Cross', marca: 'Volkswagen', descricao: 'SUV compacto com bom espaço interno e tecnologia embarcada.', status: 'Manutenção', capacidadeKg: 520 },
  ]);

  readonly carros = this._carros.asReadonly();

  // Indicadores derivados — usados no Dashboard (KPIs e barra de status)
  readonly totalVeiculos = computed(() => this._carros().length);
  readonly disponiveis = computed(() => this._carros().filter(c => c.status === 'Disponível').length);
  readonly emViagem = computed(() => this._carros().filter(c => c.status === 'Em Viagem').length);
  readonly emManutencao = computed(() => this._carros().filter(c => c.status === 'Manutenção').length);

  readonly percDisponiveis = computed(() => this.totalVeiculos() > 0 ? Math.round((this.disponiveis() / this.totalVeiculos()) * 100) : 0);
  readonly percEmViagem = computed(() => this.totalVeiculos() > 0 ? Math.round((this.emViagem() / this.totalVeiculos()) * 100) : 0);
  readonly percManutencao = computed(() => this.totalVeiculos() > 0 ? Math.round((this.emManutencao() / this.totalVeiculos()) * 100) : 0);

  /**
   * 2. NOVO MÉTODO: Permite que o ViagensService altere o status do veículo em tempo real
   */
  atualizarStatus(placa: string, novoStatus: 'Disponível' | 'Em Viagem' | 'Manutenção') {
    this._carros.update(lista =>
      lista.map(c => c.placa === placa ? { ...c, status: novoStatus } : c)
    );
  }
}
