import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative aspect-video bg-black">
      @if (!isPlaying) {
        <div class="absolute inset-0 flex items-center justify-center cursor-pointer" (click)="play()">
          @if (thumbnailUrl) {
            <img [src]="thumbnailUrl" [alt]="title" class="absolute inset-0 w-full h-full object-cover">
          }
          <div class="absolute inset-0 bg-black/40"></div>
          <button class="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
            <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      } @else {
        <iframe
          #youtubeIframe
          [src]="safeEmbedUrl"
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      }
    </div>
  `
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() videoUrl!: string;
  @Input() title!: string;
  @ViewChild('youtubeIframe') iframeRef!: ElementRef<HTMLIFrameElement>;
  
  isPlaying = false;
  thumbnailUrl = '';
  embedUrl = '';
  safeEmbedUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const videoId = this.extractVideoId(this.videoUrl);
    this.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    this.embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl);
  }

  ngAfterViewInit(): void {}

  play(): void {
    this.isPlaying = true;
  }

  private extractVideoId(url: string): string {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  }
}
