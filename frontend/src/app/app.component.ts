import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './paginas/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
