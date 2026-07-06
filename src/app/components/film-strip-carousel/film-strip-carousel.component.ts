import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

interface FrameConfig {
  focusX?: number;
  focusY?: number;
}

const CONFIGS: Record<string, FrameConfig> = {
  '20210725_163318 - copia.webp':        { focusY: 22 },
  '20211124_172050 (1).jpg':             { focusY: 25 },
  '20220907_175714.webp':                { focusY: 20 },
  '20250413_002555 (1).jpg':             { focusY: 18 },
  '20250925_113834.webp':                { focusY: 20 },
  '20250928_020922.JPG':                 { focusY: 22 },
  '20260527_162009.JPG':                 { focusY: 25 },
  'IMG-20191031-WA0033.JPG':             {},
  'IMG-20230530-WA0026.JPG':             { focusY: 18 },
  'IMG-20241228-WA0039.JPG':             { focusY: 15 },
  'IMG_20201214_185718.JPG':             {},
  'IMG_4876.JPG':                        {},
  'seda15años-95.jpg':                   { focusY: 18 },
  'seda15años-96.jpg':                   {},
  '_DSC8126 (1).jpg':                    { focusY: 22 },
};

@Component({
  selector: 'app-film-strip-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #stripEl class="film-strip"
      (mousedown)="onDragStart($event)"
      (touchstart)="onTouchStart($event)">
      <div class="sprocket-col left"></div>
      <div class="sprocket-col right"></div>
      <div #trackEl class="track">
        @for (img of trackImages; track $index) {
          <div class="frame">
            <img [src]="img" class="frame-image"
              [style.object-position]="getPosition(img)"
              draggable="false"
              (load)="onImgLoad($event, img)"
              (error)="onImgError($event, img)" />
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .film-strip {
      position: relative;
      width: 180px;
      min-height: 900px;
      flex-shrink: 0;
      overflow: hidden;
      background: #111;
      border-radius: 3px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.04);
      user-select: none;
      cursor: grab;
    }
    .film-strip:active { cursor: grabbing; }

    .sprocket-col {
      position: absolute;
      top: 0; bottom: 0; width: 12px;
      z-index: 3; pointer-events: none;
    }
    .sprocket-col.left { left: 0; }
    .sprocket-col.right { right: 0; }
    .sprocket-col::before {
      content: '';
      position: absolute;
      top: 8px; left: 3px; right: 3px; bottom: 8px;
      background: repeating-linear-gradient(180deg,
        transparent 0px, transparent 8px,
        rgba(255,255,255,0.10) 8px, rgba(255,255,255,0.10) 10px,
        transparent 10px, transparent 20px);
    }

    .track {
      position: absolute;
      left: 12px; right: 12px; top: 0;
      z-index: 2;
      will-change: transform;
    }

    .frame {
      width: 156px;
      height: 184px;
      overflow: hidden;
      position: relative;
      border: 1px solid rgba(255,255,255,0.08);
      background: #1a1a1a;
      margin-bottom: 6px;
      box-sizing: border-box;
    }
    .frame:first-child { margin-top: 8px; }

    .frame-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: saturate(0.88) contrast(1.04);
      transition: filter 0.4s ease;
    }
    .film-strip:hover .frame-image {
      filter: saturate(0.95) contrast(1.08) brightness(1.06);
    }

    @media (max-width: 768px) {
      .film-strip { width: 140px; min-height: 700px; }
      .frame { width: 116px; height: 145px; box-sizing: border-box; }
    }
    @media (max-width: 640px) {
      .film-strip { width: 120px; min-height: 560px; }
      .frame { width: 96px; height: 120px; box-sizing: border-box; }
    }
  `]
})
export class FilmStripCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() images: string[] = [];
  @Input() side: 'left' | 'right' = 'left';

  @ViewChild('stripEl') stripEl!: ElementRef<HTMLDivElement>;
  @ViewChild('trackEl') trackEl!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = false;
  trackImages: string[] = [];
  private currentIndex = 0;
  private frameHeight = 190;
  private timeline: gsap.core.Timeline | null = null;
  private isPaused = false;
  private timeoutId: any = null;
  private resumeTimeoutId: any = null;

  private dragging = false;
  private dragStartY = 0;
  private dragStartOffset = 0;
  private currentY = 0;
  private velocity = 0;
  private lastY = 0;
  private lastTime = 0;
  private isAutoPlaying = true;

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.buildTrack();
  }

  ngAfterViewInit() {
    if (!this.isBrowser || this.images.length === 0) return;
    this.loadedCount = 0;
    console.log(`[FilmStrip] Expected frames: ${this.trackImages.length} (${this.images.length} unique × 3 copies)`);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.measureFrame();
        this.currentY = 0;
        this.startCarousel();
      });
    });
  }

  ngOnDestroy() {
    this.timeline?.kill();
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.resumeTimeoutId) clearTimeout(this.resumeTimeoutId);
  }

  getPosition(img: string): string {
    const c = this.getConfig(img);
    return `${c.focusX ?? 50}% ${c.focusY ?? 50}%`;
  }

  onImgLoad(e: Event, img: string) {
    console.log(`[FilmStrip] LOADED: ${img}`);
    this.loadedCount++;
    if (this.loadedCount === this.trackImages.length) {
      console.log(`[FilmStrip] ALL ${this.loadedCount} images loaded successfully`);
    }
  }

  onImgError(e: Event, img: string) {
    console.error(`[FilmStrip] FAILED: ${img}`);
    this.loadedCount++;
    if (this.loadedCount === this.trackImages.length) {
      console.warn(`[FilmStrip] FINAL: ${this.loadedCount} total — some images FAILED to load`);
    }
  }

  private loadedCount = 0;
  private totalCount = 0;

  private getConfig(img: string): FrameConfig {
    const filename = img.split('/').pop() || '';
    return CONFIGS[filename] || {};
  }

  private buildTrack() {
    if (this.images.length === 0) return;
    const a = this.shuffle([...this.images]);
    const b = this.shuffle([...this.images]);
    const c = this.shuffle([...this.images]);
    this.trackImages = [...a, ...b, ...c];
  }

  private shuffle(arr: string[]): string[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  private measureFrame() {
    const track = this.trackEl?.nativeElement;
    if (!track) return;
    const first = track.querySelector('.frame') as HTMLElement;
    if (first && first.offsetHeight > 0) {
      const style = getComputedStyle(first);
      this.frameHeight = first.offsetHeight + parseInt(style.marginBottom || '6');
    }
  }

  private startCarousel() { this.scheduleNext(); }

  private scheduleNext() {
    if (this.isPaused || !this.isAutoPlaying) return;
    this.timeoutId = setTimeout(() => this.advanceFrame(), 4000 + Math.random() * 2000);
  }

  private advanceFrame() {
    if (this.isPaused || !this.isAutoPlaying) return;
    this.currentIndex++;

    const oneCopy = this.images.length;
    if (this.currentIndex >= oneCopy * 2) {
      this.currentIndex = 0;
      this.currentY = 0;
      gsap.set(this.trackEl?.nativeElement, { y: 0 });
    }

    this.currentY = -(this.currentIndex * this.frameHeight);
    this.timeline = gsap.timeline({ onComplete: () => this.scheduleNext() });
    this.timeline.to(this.trackEl?.nativeElement, {
      y: this.currentY,
      duration: 0.8 + Math.random() * 0.25,
      ease: 'power2.inOut',
    });
  }

  private resumeAutoPlay() {
    if (this.resumeTimeoutId) clearTimeout(this.resumeTimeoutId);
    this.resumeTimeoutId = setTimeout(() => {
      this.isAutoPlaying = true;
      this.currentIndex = Math.round(Math.abs(this.currentY) / this.frameHeight);
      this.scheduleNext();
    }, 4000);
  }

  onDragStart(e: MouseEvent) {
    e.preventDefault();
    this.dragging = true;
    this.isAutoPlaying = false;
    if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
    if (this.resumeTimeoutId) { clearTimeout(this.resumeTimeoutId); this.resumeTimeoutId = null; }
    this.timeline?.kill();

    this.dragStartY = e.clientY;
    this.dragStartOffset = this.currentY;
    this.lastY = e.clientY;
    this.lastTime = Date.now();
    this.velocity = 0;

    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.onDragEnd);
  }

  private onDragMove = (e: MouseEvent) => {
    if (!this.dragging) return;
    const dy = e.clientY - this.dragStartY;
    this.currentY = this.dragStartOffset + dy;

    const maxScroll = 0;
    const minScroll = -((this.trackImages.length - 3) * this.frameHeight);
    this.currentY = Math.max(minScroll, Math.min(maxScroll, this.currentY));

    const now = Date.now();
    const dt = now - this.lastTime;
    if (dt > 0) {
      this.velocity = (e.clientY - this.lastY) / dt * 16;
    }
    this.lastY = e.clientY;
    this.lastTime = now;

    gsap.set(this.trackEl?.nativeElement, { y: this.currentY });
  };

  private onDragEnd = () => {
    if (!this.dragging) return;
    this.dragging = false;
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);

    const inertiaY = this.currentY + this.velocity * 8;
    const snapped = Math.round(Math.abs(inertiaY) / this.frameHeight) * this.frameHeight;
    const maxScroll = (this.trackImages.length - 3) * this.frameHeight;
    const target = -Math.min(Math.max(0, snapped), maxScroll);

    const oneCopy = this.images.length;
    if (Math.abs(target) >= oneCopy * 2 * this.frameHeight) {
      this.currentIndex = 0;
      this.currentY = 0;
      gsap.set(this.trackEl?.nativeElement, { y: 0 });
    } else {
      this.currentIndex = Math.round(Math.abs(target) / this.frameHeight);
      this.currentY = target;
      gsap.to(this.trackEl?.nativeElement, {
        y: target,
        duration: 0.5,
        ease: 'power3.out',
      });
    }

    this.resumeAutoPlay();
  };

  onTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    this.dragging = true;
    this.isAutoPlaying = false;
    if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
    if (this.resumeTimeoutId) { clearTimeout(this.resumeTimeoutId); this.resumeTimeoutId = null; }
    this.timeline?.kill();

    this.dragStartY = touch.clientY;
    this.dragStartOffset = this.currentY;
    this.lastY = touch.clientY;
    this.lastTime = Date.now();
    this.velocity = 0;

    document.addEventListener('touchmove', this.onTouchMove, { passive: false });
    document.addEventListener('touchend', this.onTouchEnd);
  }

  private onTouchMove = (e: TouchEvent) => {
    if (!this.dragging || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dy = touch.clientY - this.dragStartY;
    this.currentY = this.dragStartOffset + dy;

    const maxScroll = 0;
    const minScroll = -((this.trackImages.length - 3) * this.frameHeight);
    this.currentY = Math.max(minScroll, Math.min(maxScroll, this.currentY));

    const now = Date.now();
    const dt = now - this.lastTime;
    if (dt > 0) {
      this.velocity = (touch.clientY - this.lastY) / dt * 16;
    }
    this.lastY = touch.clientY;
    this.lastTime = now;

    gsap.set(this.trackEl?.nativeElement, { y: this.currentY });
  };

  private onTouchEnd = () => {
    if (!this.dragging) return;
    this.dragging = false;
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);

    const inertiaY = this.currentY + this.velocity * 8;
    const snapped = Math.round(Math.abs(inertiaY) / this.frameHeight) * this.frameHeight;
    const maxScroll = (this.trackImages.length - 3) * this.frameHeight;
    const target = -Math.min(Math.max(0, snapped), maxScroll);

    const oneCopy = this.images.length;
    if (Math.abs(target) >= oneCopy * 2 * this.frameHeight) {
      this.currentIndex = 0;
      this.currentY = 0;
      gsap.set(this.trackEl?.nativeElement, { y: 0 });
    } else {
      this.currentIndex = Math.round(Math.abs(target) / this.frameHeight);
      this.currentY = target;
      gsap.to(this.trackEl?.nativeElement, {
        y: target,
        duration: 0.5,
        ease: 'power3.out',
      });
    }

    this.resumeAutoPlay();
  };
}
