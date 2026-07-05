import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CinematicCursorComponent } from './components/cinematic-cursor/cinematic-cursor.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, CinematicCursorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  animationState = signal('');
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.animationState.set('route-animation');
      setTimeout(() => this.animationState.set(''), 400);
    });
  }
}
