import { Component, OnInit, OnDestroy, AfterViewInit, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cinematic-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #cursorRef class="cinematic-cursor">
      <div class="reel-container">
        <img #simpleReel class="reel-simple" src="assets/cursor/SimplefilmReelLight.svg" alt="" draggable="false" />
        <img #detailedReel class="reel-detailed" src="assets/cursor/filmReelLight.svg" alt="" draggable="false" />
      </div>
      <div #glowEl class="cursor-glow"></div>
    </div>
  `,
  styles: [`
    .cinematic-cursor {
      position: fixed; pointer-events: none; z-index: 99999;
      will-change: transform;
      top: 0; left: 0;
      width: 44px; height: 44px;
      margin: -22px 0 0 -22px;
      opacity: 0; visibility: hidden;
    }
    .reel-container {
      position: relative; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
    }
    .reel-simple, .reel-detailed {
      position: absolute; width: 100%; height: 100%;
      object-fit: contain; pointer-events: none;
      will-change: transform, opacity;
      backface-visibility: hidden;
    }
    .reel-detailed { opacity: 0; visibility: hidden; }
    .cursor-glow {
      position: absolute; top: 50%; left: 50%;
      width: 90px; height: 90px;
      margin: -45px 0 0 -45px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%);
      opacity: 0; visibility: hidden;
      will-change: transform, opacity;
    }
  `]
})
export class CinematicCursorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cursorRef') cursorRef!: ElementRef<HTMLDivElement>;
  @ViewChild('simpleReel') simpleReel!: ElementRef<HTMLImageElement>;
  @ViewChild('detailedReel') detailedReel!: ElementRef<HTMLImageElement>;
  @ViewChild('glowEl') glowEl!: ElementRef<HTMLDivElement>;

  private mouse = { x: 0, y: 0 };
  private current = { x: 0, y: 0 };
  private rafId = 0;
  private isActive = false;
  private isLeaving = false;
  private clickLock = false;
  private rotationTween: gsap.core.Tween | null = null;
  private detailedRotation: gsap.core.Tween | null = null;
  private styleEl: HTMLStyleElement | null = null;

  private cursorSelector = '[data-cursor="project"], [data-cursor="reel"]';

  ngOnInit() { this.bindEvents(); }

  ngAfterViewInit() {
    gsap.set(this.cursorRef?.nativeElement, { autoAlpha: 0 });
    this.initRotation();
    this.startLoop();
  }

  ngOnDestroy() {
    document.body.style.cursor = '';
    this.removeCursorHide();
    cancelAnimationFrame(this.rafId);
    this.rotationTween?.kill();
    this.detailedRotation?.kill();
    this.unbindEvents();
  }

  private bindEvents() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseover', this.onMouseOver);
    document.addEventListener('mouseout', this.onMouseOut);
    document.addEventListener('click', this.onClick);
  }

  private unbindEvents() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseover', this.onMouseOver);
    document.removeEventListener('mouseout', this.onMouseOut);
    document.removeEventListener('click', this.onClick);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private getCursorTarget(el: HTMLElement): HTMLElement | null {
    return el?.closest?.(this.cursorSelector) as HTMLElement | null;
  }

  private onMouseOver = (e: MouseEvent) => {
    const el = this.getCursorTarget(e.target as HTMLElement);
    if (el && !this.clickLock) {
      document.body.style.cursor = 'none';
      el.style.cursor = 'none';
      this.enterHover();
    }
  };

  private onMouseOut = (e: MouseEvent) => {
    const from = this.getCursorTarget(e.target as HTMLElement);
    const to = this.getCursorTarget(e.relatedTarget as HTMLElement);
    if (from && !to) {
      document.body.style.cursor = '';
      (this.getCursorTarget(e.target as HTMLElement))?.style?.removeProperty('cursor');
      this.leaveHover();
    }
  };

  private onClick = (e: MouseEvent) => {
    const el = this.getCursorTarget(e.target as HTMLElement);
    if (!el || this.clickLock) return;
    this.clickLock = true;

    this.rotationTween?.kill();
    this.detailedRotation?.kill();

    const s = this.simpleReel?.nativeElement;
    const d = this.detailedReel?.nativeElement;
    const now = performance.now();

    gsap.to([s, d], {
      rotation: '+=360', duration: 0.3, ease: 'power2.out',
      transformOrigin: 'center center',
      onComplete: () => {
        this.clickLock = false;
        this.startContinuousRotation(s, d);
      },
    });
    gsap.to(this.glowEl?.nativeElement, { scale: 1.3, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 });
  };

  private enterHover() {
    if (this.isActive) return;
    this.isActive = true;
    this.isLeaving = false;
    this.injectCursorHide();

    if (this.simpleReel?.nativeElement && this.detailedReel?.nativeElement) {
      this.startContinuousRotation(this.simpleReel.nativeElement, this.detailedReel.nativeElement);
    }

    gsap.to(this.cursorRef?.nativeElement, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' });
    gsap.to(this.detailedReel?.nativeElement, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' });
    gsap.to(this.simpleReel?.nativeElement, { autoAlpha: 0, duration: 0.2, ease: 'power2.out' });
    gsap.to(this.cursorRef?.nativeElement, { scale: 1.15, duration: 0.4, ease: 'back.out(1.7)' });
    gsap.to(this.glowEl?.nativeElement, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
  }

  private leaveHover() {
    if (!this.isActive || this.clickLock || this.isLeaving) return;
    this.isLeaving = true;
    this.removeCursorHide();

    gsap.to(this.cursorRef?.nativeElement, {
      scale: 1, autoAlpha: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        this.isActive = false;
        this.isLeaving = false;
        gsap.set(this.detailedReel?.nativeElement, { autoAlpha: 0 });
        gsap.set(this.simpleReel?.nativeElement, { autoAlpha: 1, rotation: 0 });
        gsap.set(this.glowEl?.nativeElement, { autoAlpha: 0, scale: 0.8 });
        if (this.simpleReel?.nativeElement && this.detailedReel?.nativeElement) {
          this.startContinuousRotation(this.simpleReel.nativeElement, this.detailedReel.nativeElement);
        }
      },
    });
    gsap.to(this.detailedReel?.nativeElement, { autoAlpha: 0, duration: 0.15, ease: 'power2.in' });
    gsap.to(this.glowEl?.nativeElement, { autoAlpha: 0, scale: 0.8, duration: 0.15, ease: 'power2.in' });
  }

  private resetToIdle() {
    gsap.set(this.detailedReel?.nativeElement, { autoAlpha: 0 });
    gsap.set(this.simpleReel?.nativeElement, { autoAlpha: 1, rotation: 0 });
    gsap.set(this.cursorRef?.nativeElement, { scale: 1, autoAlpha: 0 });
    gsap.set(this.glowEl?.nativeElement, { autoAlpha: 0, scale: 0.8 });
    if (this.simpleReel?.nativeElement && this.detailedReel?.nativeElement) {
      this.startContinuousRotation(this.simpleReel.nativeElement, this.detailedReel.nativeElement);
    }
  }

  private initRotation() {
    if (!this.simpleReel?.nativeElement || !this.detailedReel?.nativeElement) {
      setTimeout(() => this.initRotation(), 100);
      return;
    }
    this.startContinuousRotation(this.simpleReel.nativeElement, this.detailedReel.nativeElement);
  }

  private startContinuousRotation(s: HTMLElement, d: HTMLElement) {
    this.rotationTween?.kill();
    this.detailedRotation?.kill();

    const speed = this.isActive ? 8 / 2.5 : 8;
    this.rotationTween = gsap.to(s, {
      rotation: 360, duration: speed, ease: 'none', repeat: -1,
      transformOrigin: 'center center',
    });
    this.detailedRotation = gsap.to(d, {
      rotation: 360, duration: speed, ease: 'none', repeat: -1,
      transformOrigin: 'center center', paused: !this.isActive,
    });
  }

  private startLoop() {
    const el = this.cursorRef?.nativeElement;
    if (!el) { this.rafId = requestAnimationFrame(() => this.startLoop()); return; }

    const step = () => {
      if (this.isActive || this.isLeaving) {
        this.current.x += (this.mouse.x - this.current.x) * 0.35;
        this.current.y += (this.mouse.y - this.current.y) * 0.35;
        gsap.set(el, { x: this.current.x, y: this.current.y });
      }
      this.rafId = requestAnimationFrame(step);
    };
    step();
  }

  private injectCursorHide() {
    if (this.styleEl) return;
    this.styleEl = document.createElement('style');
    this.styleEl.textContent = `
      [data-cursor="project"] *,
      [data-cursor="reel"] * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(this.styleEl);
  }

  private removeCursorHide() {
    if (this.styleEl) {
      this.styleEl.remove();
      this.styleEl = null;
    }
  }
}
