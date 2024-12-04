import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated = signal(false); // Inicializa con un valor predeterminado

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Actualiza el estado de autenticación
    this.isAuthenticated.set(this.authService.isAuthenticated());
  }

  logout(): void {
    // Llama al método de logout del servicio
    this.authService.logout();
    // Actualiza el estado de autenticación
    this.isAuthenticated.set(false);
  }
}
