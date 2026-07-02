import { FilterOption } from "../../models/entity-type-filter.model"
import { Component } from "@angular/core"
import { Output } from "@angular/core"
import { EventEmitter } from "@angular/core"
import { EntityCategory } from "../../models/vla-node.model"
import { LucideDynamicIcon, LucideUser, LucideBuilding2, LucidePhone, LucideMail, LucideMapPin, LucideFileText, LucideCar } from '@lucide/angular';

@Component({
  selector: 'app-entity-type-filter',
  standalone: true,
  imports: [LucideDynamicIcon],
  templateUrl: './entity-type-filter.html',
  styleUrl: './entity-type-filter.css'
})

export class EntityTypeFilter {
  filters: FilterOption[] = [
    { type: 'person', label: 'Pessoa', color: '#3b82f6', active: true, icon: LucideUser },
    { type: 'company', label: 'Empresa', color: '#f59e0b', active: true, icon: LucideBuilding2 },
    { type: 'phone', label: 'Telefone', color: '#10b981', active: true, icon: LucidePhone },
    { type: 'email', label: 'E-mail', color: '#8b5cf6', active: true, icon: LucideMail },
    { type: 'address', label: 'Endereço', color: '#ec4899', active: true, icon: LucideMapPin },
    { type: 'document', label: 'Documento', color: '#ef4444', active: true, icon: LucideFileText },
    { type: 'vehicle', label: 'Veículo', color: '#06b6d4', active: true, icon: LucideCar }
  ]

//Mudar estado pelo clique
  toggleFilter(filter: FilterOption) {
    filter.active = !filter.active
  const activeFilters = this.filters.filter(f => f.active === true);

  // Enviar o output formatado para o pai
  const activeTypes = activeFilters.map(f => f.type);
  this.filtersChanged.emit(activeTypes)
  }

  @Output() filtersChanged = new EventEmitter<EntityCategory[]>()
}