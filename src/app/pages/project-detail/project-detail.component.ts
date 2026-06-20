import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { Project, getProjectById, PROJECTS } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, VideoPlayerComponent],
  template: `
    <app-header />
    
    <main class="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      @if (project) {
        <section class="container-custom py-8">
          <a routerLink="/work" class="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l-4 4m0 0l-4-4m4 4V3"/>
            </svg>
            {{ t('project.back') }}
          </a>
        </section>
        
        <section class="container-custom pb-8">
          <div class="aspect-video bg-black dark:bg-black max-w-5xl">
            <app-video-player 
              [videoUrl]="project.videoUrl"
              [title]="project.title" />
          </div>
        </section>
        
        <section class="container-custom py-8 border-t border-gray-100 dark:border-gray-800">
          <div class="max-w-3xl">
            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span class="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-medium">{{ project.category }}</span>
              <span>{{ project.year }}</span>
            </div>
            
            <h1 class="text-4xl lg:text-5xl font-black tracking-tight mb-6 text-black dark:text-white">{{ project.title }}</h1>
            
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {{ project.description }}
            </p>
            
            <div class="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              @if (previousProject) {
                <a [href]="'/work/' + previousProject.id" class="inline-flex items-center gap-2 border-2 border-black dark:border-white px-6 py-3 font-medium text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                  </svg>
                  {{ t('project.previous') }}
                </a>
              }
              @if (nextProject) {
                <a [href]="'/work/' + nextProject.id" class="inline-flex items-center gap-2 border-2 border-black dark:border-white px-6 py-3 font-medium text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                  {{ t('project.next') }}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              }
            </div>
          </div>
        </section>
      } @else {
        <section class="container-custom py-16">
          <a routerLink="/work" class="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l-4 4m0 0l-4-4m4 4V3"/>
            </svg>
            {{ t('project.back') }}
          </a>
          <h1 class="text-2xl font-bold mb-4 text-black dark:text-white">{{ t('project.notFound') }}</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ t('project.notFoundDesc') }}</p>
        </section>
      }
    </main>
    
    <app-footer />
  `
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  previousProject: Project | undefined;
  nextProject: Project | undefined;
  translationService = inject(TranslationService);

  constructor(private route: ActivatedRoute) {}

  t(key: string): string {
    return this.translationService.t(key);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.project = getProjectById(id);
      
      if (this.project) {
        const currentIndex = PROJECTS.findIndex(p => p.id === this.project!.id);
        this.previousProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : undefined;
        this.nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : undefined;
      }
    }
  }
}
