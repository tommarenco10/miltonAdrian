import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { Category, Project, getAllCategories, PROJECTS, getProjectsByCategory } from '../../data/projects.data';
import { TranslationService } from '../../services/translation.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ProjectCardComponent],
  template: `
    <app-header />
    
    <main data-cursor="reel" class="min-h-screen pt-20 bg-white dark:bg-black transition-colors duration-300">
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-700">
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
              {{ tCategory(category.slug) }}
            </button>
          }
        </div>
        
        @if (selectedCategory) {
          <div>
            <h2 class="text-2xl font-bold tracking-tight mb-8 pb-4 border-b-2 border-black dark:border-white">
              {{ tCategory(selectedCategory) }}
            </h2>
            @for (group of getFilteredGroups(); track group.name) {
              @if (group.name !== 'Otros') {
              <div class="mb-10">
                <h3 class="text-lg font-bold tracking-tight mb-6 pb-3 border-b-2 border-gray-300 dark:border-gray-700">
                  {{ group.name }}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                  @for (project of group.projects; track project.id) {
                    <app-project-card class="min-w-0"
                      [project]="project"
                      (onSelect)="onProjectSelect($event)" />
                  }
                </div>
              </div>
              }
            }
            @if (getOtrosProjects().length > 0) {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                @for (project of getOtrosProjects(); track project.id) {
                  <app-project-card class="min-w-0"
                    [project]="project"
                    (onSelect)="onProjectSelect($event)" />
                }
              </div>
            }
          </div>
        } @else {
          @for (category of categories; track category.slug) {
            <div class="mb-16">
              <h2 class="text-xl font-bold tracking-tight mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                {{ tCategory(category.slug) }}
                <span class="text-gray-400 dark:text-gray-500 font-normal text-sm ml-2">({{ category.projects.length }})</span>
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                @for (project of category.projects; track project.id) {
                  <app-project-card class="min-w-0"
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

  private categoryTranslationKeys: { [slug: string]: string } = {
    'behind-the-scenes': 'category.behindTheScenes',
    'feature-films': 'category.featureFilms',
    'live-session': 'category.liveSession',
    'recitales': 'category.recitales',
    'videoclips': 'category.videoclips',
    'deportes': 'category.deportes',
    'social-media': 'category.socialMedia',
    'podcasts': 'category.podcasts'
  };

  youtubeService = inject(YoutubeService);

  ngOnInit(): void {
    this.categories = getAllCategories();
    this.projects = PROJECTS;
    this.youtubeService.populateTitles(this.projects);
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  tCategory(slug: string): string {
    const translationKey = this.categoryTranslationKeys[slug];
    if (translationKey) {
      return this.translationService.t(translationKey);
    }
    const category = this.categories.find(c => c.slug === slug);
    return category?.name || slug;
  }

  filterCategory(slug: string | null): void {
    this.selectedCategory = slug;
    if (slug) {
      this.filteredProjects = getProjectsByCategory(slug);
    } else {
      this.filteredProjects = [];
    }
  }

  getFilteredGroups(): { name: string; projects: Project[] }[] {
    const groups = new Map<string, Project[]>();
    for (const project of this.filteredProjects) {
      const key = project.group || 'Otros';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(project);
    }
    return Array.from(groups.entries()).map(([name, projects]) => ({ name, projects }));
  }

  getOtrosProjects(): Project[] {
    return this.filteredProjects.filter(p => !p.group);
  }

  getFilterButtonClass(slug: string | null): string {
    const base = 'px-4 py-2 text-sm font-medium tracking-wide transition-all border flex-none whitespace-nowrap ';
    if (this.selectedCategory === slug) {
      return base + 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white';
    }
    return base + 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white';
  }

  onProjectSelect(project: Project): void {
    setTimeout(() => {
      window.location.href = `/work/${project.id}`;
    }, 400);
  }
}
