import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { OWNER_INFO } from '../../data/owner.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    
    <main class="min-h-screen pt-20 bg-white dark:bg-black transition-colors duration-300">
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-700">
        <div class="flex flex-col lg:flex-row gap-12 items-start">
          <div class="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0" style="cursor: url('assets/cursor/rockOnCursor.cur'), auto">
            <img 
              [src]="ownerInfo.bioImage"
              [alt]="ownerInfo.name"
              class="w-full h-full object-cover">
          </div>
          
          <div class="flex-1 pt-4">
            <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-2 block">{{ t('about.title') }}</span>
            <h1 class="text-4xl lg:text-5xl font-black tracking-tighter mb-2">
              <span class="block text-black dark:text-white">MILTON</span>
              <span class="block font-light text-gray-500 dark:text-gray-400">ADRIAN</span>
              <span class="block text-gray-400 dark:text-gray-500">CAÑETE</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mt-4">
              {{ t('about.jobTitle') }}
            </p>
            <p class="text-gray-400 dark:text-gray-500 flex items-center gap-2 mt-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {{ ownerInfo.location }}
            </p>
          </div>
        </div>
      </section>
      
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-700">
        <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-6 block">{{ t('about.bio') }}</span>
        <div class="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 text-[15px]">
            <p [innerHTML]="t('about.bioP1')"></p>
            <p [innerHTML]="t('about.bioP2')"></p>
            <p [innerHTML]="t('about.bioP3')"></p>
            <p [innerHTML]="t('about.bioP4')"></p>
            <p [innerHTML]="t('about.bioP5')"></p>
            <p [innerHTML]="t('about.bioP6')"></p>
          </div>
      </section>
      
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-700">
        <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-8 block">{{ t('about.skills') }}</span>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3 text-gray-600 dark:text-gray-300 text-[15px]">
            <span>{{ t('about.skill1') }}</span>
            <span>{{ t('about.skill2') }}</span>
            <span>{{ t('about.skill3') }}</span>
            <span>{{ t('about.skill4') }}</span>
            <span>{{ t('about.skill5') }}</span>
            <span>{{ t('about.skill6') }}</span>
            <span>{{ t('about.skill7') }}</span>
            <span>{{ t('about.skill8') }}</span>
            <span>{{ t('about.skill9') }}</span>
            <span class="sm:col-span-2 lg:col-span-1">{{ t('about.skill10') }}</span>
          </div>
      </section>
      
      <section class="container-custom py-16 bg-black dark:bg-white text-white dark:text-black transition-colors duration-300">
        <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4 block">{{ t('about.connect') }}</span>
        <h2 class="text-3xl font-bold mb-4">{{ t('about.letsWorkTogether') }}</h2>
          <p class="mb-8 text-gray-400 dark:text-gray-700">
            {{ t('about.collaboration') }}
          </p>
          <div class="flex flex-wrap gap-4">
            <a [href]="'mailto:' + ownerInfo.email" class="inline-flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white px-6 py-3 font-medium tracking-wide transition-all hover:bg-gray-200 dark:hover:bg-gray-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {{ t('about.emailMe') }}
            </a>
            <a [href]="ownerInfo.instagramUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border border-gray-600 dark:border-gray-400 px-6 py-3 font-medium tracking-wide transition-all hover:border-white dark:hover:border-black">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {{ t('about.followInstagram') }}
            </a>
          </div>
      </section>
    </main>
    
    <app-footer />
  `
})
export class AboutComponent {
  ownerInfo = OWNER_INFO;
  translationService = inject(TranslationService);

  t(key: string): string {
    return this.translationService.t(key);
  }
}
