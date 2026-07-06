import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OWNER_INFO } from '../../data/owner.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (splitWithContact) {
      <!-- Split footer: original content on left, contact CTA on right -->
      <footer class="bg-black dark:bg-black text-white dark:text-gray-300 py-16 transition-colors duration-300">
        <div class="w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <!-- Left: original footer essentials -->
            <div class="px-4 lg:pl-8 lg:pr-12 lg:border-r border-gray-800 dark:border-gray-700 pb-12 lg:pb-0 flex flex-col items-center text-center">
              <div class="flex items-center gap-2 mb-4">
                <img src="assets/FilmCameraWhite.png" class="w-8 h-8 object-contain -mt-1.5" alt="Film Camera"/>
                <div class="flex items-baseline gap-1">
                  <span class="text-lg font-black tracking-tighter">MILTON</span>
                  <span class="text-lg font-light tracking-tight text-gray-400">ADRIAN</span>
                  <span class="text-lg font-bold tracking-tight text-gray-500">FILMS</span>
                </div>
              </div>
              <div class="text-left w-full max-w-sm">
                <p class="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-8">
                  {{ t('about.bioText') }}
                </p>
                <h4 class="text-base font-semibold mb-4 text-gray-300 dark:text-gray-400 text-center">{{ t('footer.navigation') }}</h4>
                <ul class="space-y-2 mb-8 text-center">
                  <li><a routerLink="/" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.home') }}</a></li>
                  <li><a routerLink="/work" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.work') }}</a></li>
                  <li><a routerLink="/about" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.about') }}</a></li>
                  <li><a routerLink="/contact" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.contact') }}</a></li>
                </ul>
              </div>
              <div class="flex gap-4 justify-center">
                <a [href]="'mailto:' + ownerInfo.email" class="text-gray-500 hover:text-white transition-colors" title="Email">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
                <a [href]="'tel:' + ownerInfo.phone" class="text-gray-500 hover:text-white transition-colors" title="Phone">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </a>
                <a [href]="ownerInfo.instagramUrl" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-white transition-colors" title="Instagram">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a [href]="ownerInfo.youtubeUrl" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-white transition-colors" title="YouTube">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
            <!-- Right: contact CTA -->
            <div class="flex flex-col justify-center items-center text-center px-4 lg:pl-12 lg:pr-8 pt-12 lg:pt-0">
              <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4">{{ t('about.connect') }}</span>
              <h2 class="text-2xl font-bold mb-3 text-white">{{ t('about.letsWorkTogether') }}</h2>
              <p class="mb-6 text-sm text-gray-400 dark:text-gray-500 max-w-xs">
                {{ t('about.collaboration') }}
              </p>
              <div class="flex flex-col gap-3">
                <a [href]="'mailto:' + ownerInfo.email" class="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-medium tracking-wide transition-all hover:bg-gray-200 w-fit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ t('about.emailMe') }}
                </a>
                <a [href]="ownerInfo.instagramUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border border-gray-500 px-5 py-2.5 text-sm font-medium tracking-wide transition-all hover:border-white w-fit">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {{ t('about.followInstagram') }}
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 dark:border-gray-700 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 px-4 lg:px-8">
            <p class="text-xs text-gray-500 dark:text-gray-600">
              © {{ currentYear }} {{ ownerInfo.name }}. {{ t('footer.rights') }}.
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-700">
              {{ t('footer.role') }}
            </p>
          </div>
        </div>
      </footer>
    } @else {
      <footer class="bg-black dark:bg-black text-white dark:text-gray-300 py-16 transition-colors duration-300">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <img src="assets/FilmCameraWhite.png" class="w-8 h-8 object-contain -mt-1.5" alt="Film Camera"/>
                <div class="flex items-baseline gap-1">
                  <span class="text-lg font-black tracking-tighter">MILTON</span>
                  <span class="text-lg font-light tracking-tight text-gray-400">ADRIAN</span>
                  <span class="text-lg font-bold tracking-tight text-gray-500">FILMS</span>
                </div>
              </div>
              <p class="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
                {{ t('about.bioText') }}
              </p>
            </div>
            
            <div>
              <h4 class="text-sm font-semibold mb-4 text-gray-300 dark:text-gray-400">{{ t('footer.navigation') }}</h4>
              <ul class="space-y-2">
                <li>
                  <a routerLink="/" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.home') }}</a>
                </li>
                <li>
                  <a routerLink="/work" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.work') }}</a>
                </li>
                <li>
                  <a routerLink="/about" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.about') }}</a>
                </li>
                <li>
                  <a routerLink="/contact" class="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">{{ t('nav.contact') }}</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-sm font-semibold mb-4 text-gray-300 dark:text-gray-400">{{ t('footer.connect') }}</h4>
              <div class="space-y-3">
                <a [href]="'tel:' + ownerInfo.phone" class="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  {{ ownerInfo.phone }}
                </a>
                <a [href]="'mailto:' + ownerInfo.email" class="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ ownerInfo.email }}
                </a>
                <a [href]="ownerInfo.instagramUrl" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {{ ownerInfo.instagram }}
                </a>
                <a [href]="ownerInfo.youtubeUrl" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white transition-colors text-sm">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  {{ ownerInfo.youtube }}
                </a>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-800 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-xs text-gray-500 dark:text-gray-600">
              © {{ currentYear }} {{ ownerInfo.name }}. {{ t('footer.rights') }}.
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-700">
              {{ t('footer.role') }}
            </p>
          </div>
        </div>
      </footer>
    }
  `
})
export class FooterComponent {
  @Input() splitWithContact = false;
  ownerInfo = OWNER_INFO;
  currentYear = new Date().getFullYear();
  translationService = inject(TranslationService);

  t(key: string): string {
    return this.translationService.t(key);
  }
}
