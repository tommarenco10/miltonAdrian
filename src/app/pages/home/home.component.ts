import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { OWNER_INFO } from '../../data/owner.data';
import { getFixedFeaturedProjects, Project } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ProjectCardComponent],
  template: `
    <app-header />
    
    <main class="min-h-screen pt-20 bg-white dark:bg-black transition-colors duration-300">
      <section class="w-full py-20 lg:py-28 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start pl-4 pr-4">
          <div class="w-56 h-56 lg:w-80 lg:h-80 flex-shrink-0">
            <img 
              [src]="ownerInfo.profileImage" 
              [alt]="ownerInfo.name"
               class="w-full h-full object-cover">
          </div>
          
          <div class="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
            <div class="lg:w-72 xl:w-80 flex-shrink-0">
              <h1 class="text-5xl lg:text-6xl font-black tracking-tighter mb-4">
                <span class="block text-black dark:text-white">MILTON</span>
                <span class="block font-light text-gray-500 dark:text-gray-400">ADRIAN</span>
                <span class="block text-gray-400 dark:text-gray-500">FILMS</span>
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-4">
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
            <div class="flex-1 text-sm lg:text-base text-gray-600 dark:text-gray-400 space-y-3 leading-relaxed">
              <p [innerHTML]="t('home.bioP1')"></p>
              <p [innerHTML]="t('home.bioP2')"></p>
              <p [innerHTML]="t('home.bioP3')"></p>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full py-16 border-b border-gray-200 dark:border-gray-700">
        <div class="pl-4 pr-4 mb-8 flex items-center justify-between">
          <h2 class="text-2xl font-bold tracking-tight text-black dark:text-white">{{ t('home.featuredWork') }}</h2>
          <a routerLink="/work" class="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
            {{ t('home.viewAll') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>

         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800">
          @for (project of featuredProjects; track project.id) {
            <app-project-card
              [project]="project"
              [sizeClass]="'aspect-[16/9]'"
              [hideInfo]="true"
              (onSelect)="onProjectSelect($event)" />
          }
        </div>
      </section>
      
      <section class="w-full border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col lg:flex-row gap-0">
          <div class="flex-1 flex flex-col items-center py-16 px-4 lg:pr-12 lg:border-r border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-900/50">
            <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-4 text-center">{{ t('about.bio') }}</span>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-left max-w-sm">
              {{ t('about.bioText') }}
            </p>
            <a routerLink="/about" class="inline-flex items-center gap-2 btn-primary">
              {{ t('home.learnMore') }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
          <div class="flex-1 flex flex-col items-center py-16 px-4 lg:pl-12 bg-white dark:bg-black">
            <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-300 uppercase mb-4 text-center">{{ t('home.getInTouch') }}</span>
            <h2 class="text-2xl font-bold mb-4 text-black dark:text-white text-center">{{ t('home.letsWorkTogether') }}</h2>
            <p class="mb-8 text-gray-500 dark:text-gray-400 text-left max-w-sm">
              {{ t('home.availability') }}
            </p>
            <a routerLink="/contact" class="inline-flex items-center gap-2 btn-primary">
              {{ t('home.getInTouch') }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
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
  youtubeService = inject(YoutubeService);

  ngOnInit(): void {
    this.featuredProjects = getFixedFeaturedProjects();
    this.youtubeService.populateTitles(this.featuredProjects);
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  isDark(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  onProjectSelect(project: Project): void {
    setTimeout(() => {
      window.location.href = `/work/${project.id}`;
    }, 400);
  }
}
