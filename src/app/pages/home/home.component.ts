import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { OWNER_INFO } from '../../data/owner.data';
import { getFeaturedProjects, Project } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ProjectCardComponent],
  template: `
    <app-header />
    
    <main class="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-800">
        <div class="flex flex-col lg:flex-row gap-12 items-start">
          <div class="w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0 border-4 border-black dark:border-white p-1">
            <img 
              [src]="ownerInfo.profileImage" 
              [alt]="ownerInfo.name"
              class="w-full h-full object-cover grayscale">
          </div>
          
          <div class="flex-1 pt-4">
            <h1 class="text-5xl lg:text-6xl font-black tracking-tighter mb-4">
              <span class="block text-black dark:text-white">MILTON</span>
              <span class="block font-light text-gray-500 dark:text-gray-400">ADRIAN</span>
              <span class="block text-gray-400 dark:text-gray-500">FILMS</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-2">
              {{ t('about.jobTitle') }}
            </p>
            <p class="text-gray-400 dark:text-gray-500 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {{ ownerInfo.location }}
            </p>
          </div>
        </div>
      </section>
      
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold tracking-tight text-black dark:text-white">{{ t('home.featuredWork') }}</h2>
          <a routerLink="/work" class="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
            {{ t('home.viewAll') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of featuredProjects; track project.id) {
            <app-project-card 
              [project]="project"
              (onSelect)="onProjectSelect($event)" />
          }
        </div>
      </section>
      
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-800">
        <div class="max-w-2xl">
          <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4 block">{{ t('about.bio') }}</span>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {{ t('about.bioText') }}
          </p>
          <a routerLink="/about" class="inline-flex items-center gap-2 btn-primary">
            {{ t('home.learnMore') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </section>
      
      <section class="container-custom py-16 bg-black dark:bg-gray-800 text-white dark:text-white transition-colors duration-300">
        <div class="max-w-2xl">
          <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-300 uppercase mb-4 block">{{ t('home.getInTouch') }}</span>
          <h2 class="text-3xl font-bold mb-4 text-white dark:text-white">{{ t('home.letsWorkTogether') }}</h2>
          <p class="mb-8 text-gray-400 dark:text-gray-300">
            {{ t('home.availability') }}
          </p>
          <a routerLink="/contact" class="inline-flex items-center gap-2 bg-white dark:bg-gray-700 text-black dark:text-white px-6 py-3 font-medium tracking-wide transition-all hover:bg-gray-200 dark:hover:bg-gray-600">
            {{ t('home.getInTouch') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </section>
    </main>
    
    <app-footer />
  `
})
export class HomeComponent implements OnInit {
  ownerInfo = OWNER_INFO;
  featuredProjects: Project[] = [];
  translationService = inject(TranslationService);

  ngOnInit(): void {
    this.featuredProjects = getFeaturedProjects(6);
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  isDark(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  onProjectSelect(project: Project): void {
    window.location.href = `/work/${project.id}`;
  }
}
