import { Component, Input } from "@angular/core";
import { VlaEdge } from "../../models/vla-edge.model";
import { VlaNode } from "../../models/vla-node.model";

@Component({
    selector: 'app-entity-details',
    standalone: true,
    templateUrl: './entity-details.html',
    styleUrl: './entity-details.css',
})
export class EntityDetails {

    // Entidade que o usuário clicou — vem do pai (vla-viewer)
    // Pode ser null quando nenhuma entidade está selecionada
    @Input() selectedEntity: VlaNode | null = null;

    // Todas as edges que pertencem à entidade selecionada — já filtradas pelo pai
    @Input() entityEdge: VlaEdge[] = [];

    // Todos os nodes do projeto — usado para buscar o node do outro lado de uma relação
    @Input() allNodes: VlaNode[] = [];

    /* Getter: retorna a quantidade de relações diretas da entidade selecionada.
       Como entityEdge já vem filtrada pelo pai, basta retornar o tamanho do array.
       Usado no template como: {{ edgeCount }} */
    get edgeCount(): number {
        return this.entityEdge.length;
    }

    /* Getter: converte o campo metadata (que é um objeto) em um array de { key, value }
       para que o @for do template consiga percorrer os detalhes da entidade.

       Exemplo:
       metadata = { cargo: "Sócio", idade: 45 }
       vira:
       [ { key: "cargo", value: "Sócio" }, { key: "idade", value: 45 } ]

       Retorna [] se não houver entidade selecionada ou se não houver metadata (RF08). */
    get metadataList(): { key: string; value: string | number | boolean }[] {
        if (!this.selectedEntity) return [];
        if (!this.selectedEntity.metadata) return [];

        return Object.entries(this.selectedEntity.metadata).map(([key, value]) => {
            return { key, value };
        });
    }

    /* Método: dado uma edge (relação), retorna o node do outro lado da relação.
       
       Raciocínio: uma edge tem source e target. Um deles é a entidade selecionada.
       O outro é quem queremos encontrar.

       Exemplo: selectedEntity = João Silva (id: "joao")
       edge = { source: "joao", target: "empresa-alfa", label: "é sócio de" }
       → anotherId = "empresa-alfa"
       → retorna o node da Empresa Alfa

       Retorna undefined se o id não bater com nenhum node (segurança). */
    searchAnotherNode(edge: VlaEdge): VlaNode | undefined {

        // Se source é a entidade selecionada, o outro lado é target — e vice-versa
        const anotherId = edge.source === this.selectedEntity!.id
            ? edge.target
            : edge.source;

        // Busca e retorna o node cujo id bate com anotherId
        return this.allNodes.find(node => node.id === anotherId);
    }
}