import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article 
      class="group cursor-pointer"
      (click)="onSelect.emit(project)">
      <div class="relative aspect-video bg-gray-900 dark:bg-black overflow-hidden mb-3 rounded-lg">
        @if (project.thumbnail) {
          <img 
            [src]="project.thumbnail" 
            [alt]="project.title"
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
            loading="lazy">
        }
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 dark:group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div class="w-14 h-14 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 border border-white/30 dark:border-white/20">
            <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p class="text-xs text-white/80">{{ project.year }}</p>
        </div>
      </div>
      <div class="space-y-1">
        <h3 class="text-sm font-medium text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          {{ project.title }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ project.category }} • {{ project.year }}
        </p>
      </div>
    </article>
  `
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() onSelect = new EventEmitter<Project>();
}
