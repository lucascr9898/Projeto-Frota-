import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';

export interface Usuario {
  usuario: string;
  senha: string;
  perfil: 'admin' | 'operacional';
  nome: string;
}

export interface SessaoUsuario {
  usuario: string;
  nome: string;
  perfil: 'admin' | 'operacional';
}

const STORAGE_KEY = 'viappia_sessao';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string): Observable<SessaoUsuario | null> {
    return this.http.get<Usuario[]>('/usuarios.json').pipe(
      delay(800), // simula latência exigida pelo PDF
      map(usuarios => {
        const encontrado = usuarios.find(
          u => u.usuario === usuario && u.senha === senha
        );

        if (!encontrado) {
          return null;
        }

        const sessao: SessaoUsuario = {
          usuario: encontrado.usuario,
          nome: encontrado.nome,
          perfil: encontrado.perfil
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessao));
        return sessao;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  getSessao(): SessaoUsuario | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  estaAutenticado(): boolean {
    return this.getSessao() !== null;
  }

  isAdmin(): boolean {
    return this.getSessao()?.perfil === 'admin';
  }
}