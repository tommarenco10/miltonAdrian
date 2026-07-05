import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      data-cursor="project"
      class="group cursor-pointer"
      (click)="onSelect.emit(project)">
      <div class="relative overflow-hidden rounded-lg border-2 border-transparent dark:border-gray-800 group-hover:border-white/50 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
        @if (project.thumbnail) {
          <div class="relative bg-black overflow-hidden" [class]="sizeClass">
            <!-- IMG thumbnail -->
            <img
              [src]="project.thumbnail"
              [alt]="project.title"
              class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-60"
              loading="lazy">

            <!-- Letterbox bars -->
            <div class="absolute top-0 left-0 right-0 h-4 bg-black z-20"></div>
            <div class="absolute bottom-0 left-0 right-0 h-4 bg-black z-20"></div>

            <!-- CINEMATIC FRAME OVERLAY -->
            <!-- Top left corner bracket -->
            <div class="absolute top-5 left-0 w-5 h-5 border-l-2 border-t-2 border-white/70 z-30"></div>
            <div class="absolute top-5 left-7 font-mono text-[10px] text-white/80 z-30 tracking-widest">TC</div>
            <!-- Top right corner bracket -->
            <div class="absolute top-5 right-0 w-5 h-5 border-r-2 border-t-2 border-white/70 z-30"></div>
            <!-- Bottom left corner bracket -->
            <div class="absolute bottom-5 left-0 w-5 h-5 border-l-2 border-b-2 border-white/70 z-30"></div>
            <div class="absolute bottom-5 left-7 font-mono text-[10px] text-white/80 z-30 tracking-widest">4K</div>
            <!-- Bottom right corner bracket -->
            <div class="absolute bottom-5 right-0 w-5 h-5 border-r-2 border-b-2 border-white/70 z-30"></div>

            <!-- Scene / take / Date info bar -->
            <div class="absolute top-5 left-16 right-16 h-5 bg-black/50 backdrop-blur-sm flex items-center px-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="font-mono text-[9px] text-white/80 tracking-widest uppercase truncate">{{ project.title || project.category }}</span>
            </div>

            <!-- Center play button -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center z-30">
              <div class="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 border-2 border-white/50">
                <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        }
      </div>
      @if (!hideInfo) {
        <div class="mt-3 space-y-1">
          <h3 class="text-sm font-semibold tracking-wide uppercase text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {{ project.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-500 font-mono">
            {{ project.category }}
          </p>
        </div>
      }
    </article>
  `
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() sizeClass: string = 'aspect-video';
  @Input() hideInfo: boolean = true;
  @Output() onSelect = new EventEmitter<Project>();
}
