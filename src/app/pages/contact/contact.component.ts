import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { OWNER_INFO } from '../../data/owner.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    
    <main class="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <section class="container-custom py-16 border-b border-gray-100 dark:border-gray-800">
        <h1 class="text-5xl lg:text-6xl font-black tracking-tighter mb-4">
          <span class="block text-black dark:text-white">{{ t('contact.title1') }}</span>
          <span class="block text-gray-400 dark:text-gray-500">{{ t('contact.title2') }}</span>
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-xl mt-6">
          {{ t('contact.subtitle') }}
        </p>
      </section>
      
      <section class="container-custom py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 class="text-2xl font-bold mb-8 text-black dark:text-white">{{ t('contact.info') }}</h2>
            
            <div class="space-y-6 mb-12">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-black dark:text-white">Email</h3>
                  <a [href]="'mailto:' + ownerInfo.email" class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    {{ ownerInfo.email }}
                  </a>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-black dark:text-white">Phone</h3>
                  <a [href]="'tel:' + ownerInfo.phone" class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    {{ ownerInfo.phone }}
                  </a>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold mb-1 text-black dark:text-white">Location</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ ownerInfo.location }}
                  </p>
                </div>
              </div>
            </div>
            
            <h3 class="font-semibold mb-4 text-black dark:text-white">Follow Me</h3>
            <div class="flex gap-4">
              <a [href]="ownerInfo.instagramUrl" target="_blank" rel="noopener noreferrer" 
                 class="w-12 h-12 border-2 border-black dark:border-white flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a [href]="ownerInfo.youtubeUrl" target="_blank" rel="noopener noreferrer" 
                 class="w-12 h-12 border-2 border-black dark:border-white flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h2 class="text-2xl font-bold mb-8 text-black dark:text-white">{{ t('contact.sendMessage') }}</h2>
            
            <form (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium mb-2 text-black dark:text-white">{{ t('contact.name') }}</label>
                <input 
                  type="text" 
                  id="name"
                  [(ngModel)]="formData.name"
                  name="name"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:outline-none transition-colors bg-white dark:bg-gray-800 text-black dark:text-white">
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium mb-2 text-black dark:text-white">{{ t('contact.email') }}</label>
                <input 
                  type="email" 
                  id="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:outline-none transition-colors bg-white dark:bg-gray-800 text-black dark:text-white">
              </div>
              
              <div>
                <label for="projectType" class="block text-sm font-medium mb-2 text-black dark:text-white">{{ t('contact.projectType') }}</label>
                <select 
                  id="projectType"
                  [(ngModel)]="formData.projectType"
                  name="projectType"
                  class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:outline-none transition-colors bg-white dark:bg-gray-800 text-black dark:text-white">
                  <option value="">{{ t('contact.selectType') }}</option>
                  <option value="music-video">{{ t('projectType.musicVideo') }}</option>
                  <option value="live-session">{{ t('projectType.liveSession') }}</option>
                  <option value="feature-film">{{ t('projectType.featureFilm') }}</option>
                  <option value="documentary">{{ t('projectType.documentary') }}</option>
                  <option value="podcast">{{ t('projectType.podcast') }}</option>
                  <option value="commercial">{{ t('projectType.commercial') }}</option>
                  <option value="other">{{ t('projectType.other') }}</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium mb-2 text-black dark:text-white">{{ t('contact.message') }}</label>
                <textarea 
                  id="message"
                  [(ngModel)]="formData.message"
                  name="message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:outline-none transition-colors resize-none bg-white dark:bg-gray-800 text-black dark:text-white"></textarea>
              </div>
              
              <button type="submit" class="w-full btn-primary py-4">
                {{ t('contact.send') }}
              </button>
            </form>
            
            @if (submitted) {
              <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-center">
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ t('contact.success') }}
              </div>
            }
          </div>
        </div>
      </section>
    </main>
    
    <app-footer />
  `
})
export class ContactComponent {
  ownerInfo = OWNER_INFO;
  translationService = inject(TranslationService);
  submitted = false;
  
  formData = {
    name: '',
    email: '',
    projectType: '',
    message: ''
  };

  t(key: string): string {
    return this.translationService.t(key);
  }

  onSubmit(): void {
    this.submitted = true;
    this.formData = {
      name: '',
      email: '',
      projectType: '',
      message: ''
    };
    setTimeout(() => this.submitted = false, 5000);
  }
}
