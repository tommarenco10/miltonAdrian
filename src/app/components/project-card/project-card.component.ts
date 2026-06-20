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
      <div class="relative aspect-video bg-gray-900 dark:bg-black overflow-hidden mb-3">
        @if (project.thumbnail) {
          <img 
            [src]="project.thumbnail" 
            [alt]="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy">
        }
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 dark:group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
          <svg class="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
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
