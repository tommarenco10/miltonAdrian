import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  theme = signal<Theme>(this.getInitialTheme());
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        this.applyTheme(this.theme());
      });
    }
  }
  
  private getInitialTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  }
  
  private applyTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }
  
  toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }
  
  isDark(): boolean {
    return this.theme() === 'dark';
  }
}
