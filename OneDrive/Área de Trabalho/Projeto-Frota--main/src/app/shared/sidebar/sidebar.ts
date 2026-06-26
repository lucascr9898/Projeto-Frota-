import {MediaMatcher} from '@angular/cdk/layout';
import {Component, OnDestroy, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthService} from '../../auth/auth.service';

interface ItemMenu {
  label: string;
  icone: string;
  rota?: string;
}

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: 'sidebar.html',
  styleUrl: 'sidebar.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, RouterLink, RouterLinkActive],
})
export class SidenavResponsiveExample implements OnDestroy {

  fillerNav: ItemMenu[] = [
    { label: 'Dashboard', icone: 'space_dashboard', rota: '/dashboard' },
    { label: 'Veículos', icone: 'directions_car', rota: '/veiculos' },
    { label: 'Motoristas', icone: 'badge' },
    { label: 'Rotas', icone: 'route' },
    { label: 'Viagens', icone: 'local_shipping' },
    { label: 'Configurações', icone: 'settings' },
  ];

  activeItem: string | null = 'Dashboard';

  selectItem(nav: string) {
    this.activeItem = nav;
  }

  // Adicionado: o botão "Sair" do template existia mas não chamava nada.
  // Agora ele encerra a sessão (AuthService.logout(), que limpa o
  // localStorage) e redireciona para a tela de login.
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}