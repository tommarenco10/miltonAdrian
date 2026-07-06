import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FilmStripCarouselComponent } from '../../components/film-strip-carousel/film-strip-carousel.component';
import { OWNER_INFO } from '../../data/owner.data';
import { TranslationService } from '../../services/translation.service';

const BTS_IMAGES = [
  'assets/fotosFrames/fotosMiltonResized/20210725_163318 - copia.webp',
  'assets/fotosFrames/fotosMiltonResized/20211124_172050 (1).jpg',
  'assets/fotosFrames/fotosMiltonResized/20220907_175714.webp',
  'assets/fotosFrames/fotosMiltonResized/20250413_002555 (1).jpg',
  'assets/fotosFrames/fotosMiltonResized/20250925_113834.webp',
  'assets/fotosFrames/fotosMiltonResized/20250928_020922.JPG',
  'assets/fotosFrames/fotosMiltonResized/20260527_162009.JPG',
  'assets/fotosFrames/fotosMiltonResized/IMG-20191031-WA0033.JPG',
  'assets/fotosFrames/fotosMiltonResized/IMG-20230530-WA0026.JPG',
  'assets/fotosFrames/fotosMiltonResized/IMG-20241228-WA0039.JPG',
  'assets/fotosFrames/fotosMiltonResized/IMG_20201214_185718.JPG',
  'assets/fotosFrames/fotosMiltonResized/IMG_4876.JPG',
  'assets/fotosFrames/fotosMiltonResized/seda15años-95.jpg',
  'assets/fotosFrames/fotosMiltonResized/seda15años-96.jpg',
  'assets/fotosFrames/fotosMiltonResized/_DSC8126 (1).jpg',
];

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FilmStripCarouselComponent],
  template: `
    <app-header />
    
    <main class="min-h-screen pt-20 bg-white dark:bg-black transition-colors duration-300">

      <!-- Hero + Bio framed by film strips -->
      <div class="about-framed">
        <app-film-strip-carousel
          [images]="btsImages"
          side="left"
          class="strip-el hidden md:block" />

        <div class="about-framed-content">
          <!-- Profile / Hero -->
          <section class="py-16 border-b border-gray-100 dark:border-gray-700">
            <div class="container-custom">
              <div class="flex flex-col lg:flex-row gap-12 items-start">
                <div class="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0" style="cursor: url('assets/cursor/rockOnCursor.cur'), auto">
                  <img 
                    [src]="ownerInfo.bioImage"
                    [alt]="ownerInfo.name"
                    class="w-full h-full object-cover">
                </div>
                
                <div class="flex-1 pt-4">
                  <span class="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-2 block">{{ t('about.title') }}</span>
                  <h1 class="text-4xl lg:text-5xl font-black tracking-tighter mb-2">
                    <span class="block text-black dark:text-white">MILTON</span>
                    <span class="block font-light text-gray-500 dark:text-gray-400">ADRIAN</span>
                    <span class="block text-gray-400 dark:text-gray-500">CAÑETE</span>
                  </h1>
                  <p class="text-xl text-gray-600 dark:text-gray-300 mt-4">
                    {{ t('about.jobTitle') }}
                  </p>
                  <p class="text-gray-400 dark:text-gray-500 flex items-center gap-2 mt-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ ownerInfo.location }}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Biography (no bottom border — full-width divider below) -->
          <section class="py-16">
            <div class="container-custom">
              <span class="text-sm font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-6 block">{{ t('about.bio') }}</span>
              <div class="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 text-[15px]">
                <p [innerHTML]="t('about.bioP1')"></p>
                <p [innerHTML]="t('about.bioP2')"></p>
                <p [innerHTML]="t('about.bioP3')"></p>
                <p [innerHTML]="t('about.bioP4')"></p>
                <p [innerHTML]="t('about.bioP5')"></p>
                <p [innerHTML]="t('about.bioP6')"></p>
              </div>
            </div>
          </section>
        </div>

        <app-film-strip-carousel
          [images]="btsImages"
          side="right"
          class="strip-el hidden md:block" />
      </div>

      <!-- Full-width divider between bio and skills+contact -->
      <div class="w-full border-b border-gray-100 dark:border-gray-700"></div>

      <!-- Mobile: single strip below the content -->
      <div class="flex justify-center py-8 md:hidden">
        <app-film-strip-carousel
          [images]="btsImages"
          side="left" />
      </div>
      
      <!-- Skills / Specialties (centered, full-width) -->
      <section class="w-full border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col items-center py-12 lg:py-16 px-4 bg-white dark:bg-black">
          <span class="text-sm font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-6">{{ t('about.skills') }}</span>
          <div class="flex flex-wrap justify-center gap-x-8 gap-y-2.5 max-w-lg w-full">
            <span class="skill-item">{{ t('about.skill1') }}</span>
            <span class="skill-item">{{ t('about.skill2') }}</span>
            <span class="skill-item">{{ t('about.skill3') }}</span>
            <span class="skill-item">{{ t('about.skill4') }}</span>
            <span class="skill-item">{{ t('about.skill5') }}</span>
            <span class="skill-item">{{ t('about.skill6') }}</span>
            <span class="skill-item">{{ t('about.skill7') }}</span>
            <span class="skill-item">{{ t('about.skill8') }}</span>
            <span class="skill-item">{{ t('about.skill9') }}</span>
            <span class="skill-item">{{ t('about.skill10') }}</span>
          </div>
        </div>
      </section>
    </main>
    
    <app-footer [splitWithContact]="true" />
  `,
  styles: [`
    .about-framed {
      display: flex;
      align-items: flex-start;
      gap: 3rem;
      padding: 0 1rem;
    }
    .about-framed-content {
      flex: 1;
      min-width: 0;
    }
    .strip-el {
      flex-shrink: 0;
    }
    .skill-item {
      color: #666;
      font-size: 15px;
      transition: all 0.3s ease;
      cursor: default;
    }
    .skill-item:hover {
      color: #000;
      text-shadow: 0 0 4px rgba(0,0,0,0.12), 0 0 12px rgba(0,0,0,0.06);
    }
    :host-context(html.dark) .skill-item {
      color: #999;
    }
    :host-context(html.dark) .skill-item:hover {
      color: #fff;
      text-shadow: 0 0 8px rgba(255,255,255,0.35), 0 0 20px rgba(255,255,255,0.15);
    }

    @media (max-width: 768px) {
      .about-framed {
        gap: 1.5rem;
        padding: 0 0.5rem;
      }
    }
  `]
})
export class AboutComponent {
  ownerInfo = OWNER_INFO;
  btsImages = BTS_IMAGES;
  translationService = inject(TranslationService);

  t(key: string): string {
    return this.translationService.t(key);
  }
}
