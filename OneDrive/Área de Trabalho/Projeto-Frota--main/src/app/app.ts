// app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * App é o componente raiz. Com rotas configuradas (app.routes.ts), ele só
 * precisa do <router-outlet> — é o Angular Router quem decide se mostra a
 * tela de Login, o Dashboard, ou Veículos, dependendo da URL.
 *
 * O que foi removido daqui: Dashboard, SidenavResponsiveExample, MatSidenav,
 * MatToolbar, MatIcon e MatButton estavam importados mas nenhum era usado
 * no app.html (que só tem <router-outlet></router-outlet>). Isso costuma
 * acontecer quando se começa um projeto sem rotas (tudo no app.component) e
 * depois se migra para rotas, mas os imports antigos ficam esquecidos.
 * Cada tela (Dashboard, Veiculos) já importa o que precisa por conta própria.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
