import { Component} from "@angular/core";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { VlaNode } from "../../models/vla-node.model";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-entity-list',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './entity-list.html',
    styleUrl: './entity-list.css'
})

export class  EntityList {
  @Input() filteredList: VlaNode[] = [];

  /* Quando alguém clica em uma entidade o valor é um VlaNode, quando ngm clica é o valor é null */
  @Input() selectedName: VlaNode | null = null;

  @Output() whenClickedEntidade = new EventEmitter <VlaNode> ();

   searchInput : string ='';

   onEntityClick(entity: VlaNode): void{
    this.whenClickedEntidade.emit(entity);

   }
/* f representa o item atual, vai rodar o teste 13 vezes, e em cada rodada o f representa uma entidade diferente. */
   get finalList(): VlaNode[]{
    return this.filteredList.filter(f => f.label.toLowerCase().includes(this.searchInput.toLowerCase()));

   }
}
