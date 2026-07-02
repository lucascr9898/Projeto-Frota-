import { Component, OnInit } from "@angular/core";
import { VlaEdge } from "../models/vla-edge.model";
import { VlaNode } from "../models/vla-node.model";
import { EntityCategory } from "../models/vla-node.model";
import { EntityDetails } from "../components/entity-details/entity-details";
import { EntityList } from "../components/entity-list/entity-list";
import { EntityTypeFilter } from "../components/entity-type-filter/entity-type-filter";
import { GraphView } from "../components/graph-view/graph-view";
import { VlaInterfaceService } from "../services/vla-data.service";




@Component({
    selector: 'app-viewer-component',
    standalone: true,
    imports:[EntityDetails,EntityList,EntityTypeFilter,GraphView],
    templateUrl: './viewer-component.html',
    styleUrl: './viewer-component.css'
})

export class ViewerComponent implements OnInit{
private allNodes: VlaNode[] = [];
private allEdges: VlaEdge[] = [];

selectedNode: VlaNode | null = null;

activedEntity: EntityCategory[] = ['person', 'company','phone', 'email','address','vehicle', 'document'];

visibleNode: VlaNode[] = [];
visibleEdge: VlaEdge[] = [];

constructor(private vlaService: VlaInterfaceService ){}

ngOnInit(): void {
  this.vlaService.getJson().subscribe(data =>{
    this.allNodes = data.nodes;
    this.allEdges = data.edges;
    this.applyFilters();
  });
}

private applyFilters(): void {
  if (this.selectedNode === null ) {
    this.visibleNode = this.allNodes.filter(node =>
      this.activedEntity.includes(node.type)
    );
    this.visibleEdge = this.allEdges.filter(edge =>
    this.visibleNode.some(node => node.id === edge.source) &&
    this.visibleNode.some(node => node.id === edge.target)
);
    
  } else {
   const directEdges = this.allEdges.filter(edge =>
    edge.source === this.selectedNode!.id ||
    edge.target === this.selectedNode!.id
   );

   const connectedIds = new Set ([
    this.selectedNode!.id,
    ...directEdges.flatMap( edge => [edge.source , edge.target])
   ]);

   this.visibleNode = this.allNodes.filter(movie =>
    connectedIds.has(movie.id)
   );

   this.visibleEdge = directEdges;

  }
}
}
