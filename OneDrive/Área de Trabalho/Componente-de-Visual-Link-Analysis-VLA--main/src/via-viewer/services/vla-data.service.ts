import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import { VlaNode } from "../models/vla-node.model";
import { VlaEdge } from "../models/vla-edge.model";
import { VlaInterface } from "../models/vla-interface";


@Injectable ({ providedIn: 'root'})

export class VlaInterfaceService {
 private pathNodes = 'assets/json/lista-vla-nodes.json';
 private pathEdges = 'assets/json/lista-vla-edges.json';

 constructor(private http: HttpClient) {}

  getJson(): Observable<VlaInterface> {
    return forkJoin({
        nodes: this.http.get<VlaNode[]>(this.pathNodes),
        edges: this.http.get<VlaEdge[]>(this.pathEdges)
    });
  }
}
