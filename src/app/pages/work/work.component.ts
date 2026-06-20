import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Category, Project, getAllCategories, PROJECTS, getProjectsByCategory } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ProjectCardComponent],
  template: `
    <app-header />
    
    <main class="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-800">
        <h1 class="text-5xl lg:text-6xl font-black tracking-tighter mb-4">
          <span class="block text-black dark:text-white">{{ t('work.title') }}</span>
          <span class="block text-gray-400 dark:text-gray-500">{{ t('work.subtitle') }}</span>
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-xl mt-6">
          {{ t('work.description') }}
        </p>
      </section>
      
      <section class="container-custom py-12">
        <div class="flex flex-wrap items-center gap-2 mb-12 min-w-0">
          <button 
            (click)="filterCategory(null)"
            [class]="getFilterButtonClass(null)">
            {{ t('work.allProjects') }}
          </button>
          @for (category of categories; track category.slug) {
            <button 
              (click)="filterCategory(category.slug)"
              [class]="getFilterButtonClass(category.slug)">
              {{ category.name }}
            </button>
          }
        </div>
        
        @if (selectedCategory) {
          <div>
            <h2 class="text-2xl font-bold tracking-tight mb-8 pb-4 border-b-2 border-black dark:border-white">
              {{ getCategoryName(selectedCategory) }}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (project of filteredProjects; track project.id) {
                <app-project-card 
                  [project]="project"
                  (onSelect)="onProjectSelect($event)" />
              }
            </div>
          </div>
        } @else {
          @for (category of categories; track category.slug) {
            <div class="mb-16">
              <h2 class="text-xl font-bold tracking-tight mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                {{ category.name }}
                <span class="text-gray-400 dark:text-gray-500 font-normal text-sm ml-2">({{ category.projects.length }})</span>
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                @for (project of category.projects; track project.id) {
                  <app-project-card 
                    [project]="project"
                    (onSelect)="onProjectSelect($event)" />
                }
              </div>
            </div>
          }
        }
      </section>
    </main>
    
    <app-footer />
  `
})
export class WorkComponent implements OnInit {
  categories: Category[] = [];
  projects: Project[] = [];
  selectedCategory: string | null = null;
  filteredProjects: Project[] = [];
  translationService = inject(TranslationService);

  ngOnInit(): void {
    this.categories = getAllCategories();
    this.projects = PROJECTS;
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  filterCategory(slug: string | null): void {
    this.selectedCategory = slug;
    if (slug) {
      this.filteredProjects = getProjectsByCategory(slug);
    } else {
      this.filteredProjects = [];
    }
  }

  getCategoryName(slug: string): string {
    const category = this.categories.find(c => c.slug === slug);
    return category?.name || '';
  }

  getFilterButtonClass(slug: string | null): string {
    const base = 'px-4 py-2 text-sm font-medium tracking-wide transition-all border flex-none whitespace-nowrap ';
    if (this.selectedCategory === slug) {
      return base + 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white';
    }
    return base + 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white';
  }

  onProjectSelect(project: Project): void {
    window.location.href = `/work/${project.id}`;
  }
}
