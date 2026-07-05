import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OWNER_INFO } from '../../data/owner.data';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-gray-600/60 transition-all duration-300"
            [style.background-color]="navbarBg()">
      <nav class="w-full px-4 flex items-center justify-between h-16">
        <a routerLink="/" class="group flex items-center gap-3 py-2">
          <img src="assets/FilmCameraBlack.png" class="w-9 h-9 object-contain block dark:hidden transition-transform duration-300 group-hover:scale-110 -mt-1.5" alt="Film Camera"/>
          <img src="assets/FilmCameraWhite.png" class="w-9 h-9 object-contain hidden dark:block transition-transform duration-300 group-hover:scale-110 -mt-1.5" alt="Film Camera"/>
          <div class="flex items-baseline gap-1.5">
            <span class="text-lg font-black tracking-tighter text-black dark:text-white font-['Inter']">
              MILTON
            </span>
            <span class="text-lg font-light tracking-tight text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
              ADRIAN
            </span>
            <span class="text-lg font-bold tracking-tight text-gray-400 dark:text-gray-500">
              FILMS
            </span>
          </div>
        </a>
        
        <div class="flex items-center gap-2">
          <ul class="hidden md:flex items-center">
            <li>
              <a routerLink="/work" 
                 routerLinkActive="text-black dark:text-white font-semibold shadow-[0_0_12px_rgba(0,0,0,0.12)] dark:shadow-[0_0_12px_rgba(255,255,255,0.2)]" 
                 [routerLinkActiveOptions]="{exact: true}"
                 class="px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                {{ t('nav.work') }}
              </a>
            </li>
            <li>
              <a routerLink="/about" 
                 routerLinkActive="text-black dark:text-white font-semibold shadow-[0_0_12px_rgba(0,0,0,0.12)] dark:shadow-[0_0_12px_rgba(255,255,255,0.2)]" 
                 [routerLinkActiveOptions]="{exact: true}"
                 class="px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                {{ t('nav.about') }}
              </a>
            </li>
            <li>
              <a routerLink="/contact" 
                 routerLinkActive="text-black dark:text-white font-semibold shadow-[0_0_12px_rgba(0,0,0,0.12)] dark:shadow-[0_0_12px_rgba(255,255,255,0.2)]" 
                 [routerLinkActiveOptions]="{exact: true}"
                 class="px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                {{ t('nav.contact') }}
              </a>
            </li>
          </ul>
          
          <div class="flex items-center gap-1 ml-2">
            <button 
              (click)="themeService.toggleTheme()"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme">
              @if (themeService.isDark()) {
                <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              } @else {
                <svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              }
            </button>
            
            <button 
              (click)="translationService.toggleLanguage()"
              class="px-3 py-1.5 text-xs font-bold border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors tracking-wider">
              {{ translationService.isSpanish() ? 'EN' : 'ES' }}
            </button>
          </div>
          
          <div class="hidden lg:flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-4 ml-2">
            <a [href]="ownerInfo.instagramUrl" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a [href]="ownerInfo.youtubeUrl" target="_blank" rel="noopener noreferrer" 
               class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a [href]="'mailto:' + ownerInfo.email" 
               class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  translationService = inject(TranslationService);
  ownerInfo = OWNER_INFO;
  isScrolled = signal(false);
  
  navbarBg = computed(() => {
    const isDark = this.themeService.isDark();
    if (this.isScrolled()) {
      return isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';
    }
    return isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)';
  });

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }
  
  t(key: string): string {
    return this.translationService.t(key);
  }
}
