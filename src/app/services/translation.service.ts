import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Language = 'es' | 'en';

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const TRANSLATIONS: Translations = {
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.work': { es: 'Trabajo', en: 'Work' },
  'nav.about': { es: 'Sobre Mi', en: 'About' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  'home.featuredWork': { es: 'Trabajos Destacados', en: 'Featured Work' },
  'home.viewAll': { es: 'Ver Todos', en: 'View All' },
  'home.learnMore': { es: 'Saber Mas', en: 'Learn More' },
  'home.getInTouch': { es: 'Contactame', en: 'Get in Touch' },
  'home.letsWorkTogether': { es: 'Trabajemos Juntos', en: 'Lets Work Together' },
  'home.availability': { es: 'Disponible para videos musicales, sesiones en vivo, documentales y proyectos comerciales.', en: 'Available for music videos, live sessions, documentaries, and commercial projects.' },
  'work.title': { es: 'MI', en: 'MY' },
  'work.subtitle': { es: 'TRABAJO', en: 'WORK' },
  'work.description': { es: 'Una coleccion de videos musicales, sesiones en vivo, largometrajes, documentales y mas.', en: 'A collection of music videos, live sessions, feature films, documentaries, and more.' },
  'work.allProjects': { es: 'Todos los Proyectos', en: 'All Projects' },
  'about.title': { es: 'SOBRE', en: 'ABOUT' },
  'about.bio': { es: 'Biografia', en: 'Biography' },
  'about.experience': { es: 'Experiencia', en: 'Experience' },
  'about.skills': { es: 'Habilidades', en: 'Skills & Expertise' },
  'about.connect': { es: 'Conectar', en: 'Connect' },
  'about.letsWorkTogether': { es: 'Trabajemos Juntos', en: 'Lets Work Together' },
  'about.collaboration': { es: 'Interesado en colaborar en tu proximo proyecto? Siempre estoy abierto a discutir nuevas oportunidades.', en: 'Interested in collaborating on your next project? I am always open to discussing new opportunities.' },
  'about.emailMe': { es: 'Escribeme', en: 'Email Me' },
  'about.followInstagram': { es: 'Seguir en Instagram', en: 'Follow on Instagram' },
  'exp.freelance.title': { es: 'Director de Fotografia y Productor de Video Freelance', en: 'Freelance Cinematographer & Video Producer' },
  'exp.freelance.company': { es: 'Independiente', en: 'Self-employed' },
  'exp.freelance.desc': { es: 'Produciendo y grabando videos musicales, sesiones en vivo, documentales y contenido comercial para clientes en Latinoamerica y mas.', en: 'Producing and shooting music videos, live sessions, documentaries, and commercial content for clients across Latin America and beyond.' },
  'exp.dp.title': { es: 'Director de Fotografia', en: 'Director of Photography' },
  'exp.dp.company': { es: 'Varias Productoras', en: 'Various Production Companies' },
  'exp.dp.desc': { es: 'Trabajo como DP en numerosos cortometrajes, series web y proyectos comerciales.', en: 'Worked as DP on numerous short films, web series, and commercial projects.' },
  'exp.camera.title': { es: 'Operador de Camara y Editor', en: 'Camera Operator & Editor' },
  'exp.camera.company': { es: 'Producciones Media', en: 'Media Productions' },
  'exp.camera.desc': { es: 'Comenzo su carrera en television, operando camaras para eventos en vivo y editando contenido.', en: 'Started career in broadcast television, operating cameras for live events and editing post-production content.' },
  'skills.cameraLighting': { es: 'Camara e Iluminacion', en: 'Camera & Lighting' },
  'skills.production': { es: 'Produccion', en: 'Production' },
  'skills.postProduction': { es: 'Post-Producion', en: 'Post-Production' },
  'contact.title1': { es: 'PONTE EN', en: 'GET IN' },
  'contact.title2': { es: 'CONTACTO', en: 'TOUCH' },
  'contact.subtitle': { es: 'Tienes un proyecto en mente? Creemos algo increible juntos.', en: 'Have a project in mind? Lets create something amazing together.' },
  'contact.info': { es: 'Informacion de Contacto', en: 'Contact Information' },
  'contact.sendMessage': { es: 'Enviar un Mensaje', en: 'Send a Message' },
  'contact.name': { es: 'Nombre', en: 'Name' },
  'contact.email': { es: 'Correo Electronico', en: 'Email' },
  'contact.projectType': { es: 'Tipo de Proyecto', en: 'Project Type' },
  'contact.message': { es: 'Mensaje', en: 'Message' },
  'contact.send': { es: 'Enviar Mensaje', en: 'Send Message' },
  'contact.success': { es: 'Gracias por tu mensaje! Te respondere pronto.', en: 'Thank you for your message! I will get back to you soon.' },
  'contact.selectType': { es: 'Selecciona un tipo de proyecto', en: 'Select a project type' },
  'projectType.musicVideo': { es: 'Video Musical', en: 'Music Video' },
  'projectType.liveSession': { es: 'Sesion en Vivo', en: 'Live Session' },
  'projectType.featureFilm': { es: 'Largometraje', en: 'Feature Film' },
  'projectType.documentary': { es: 'Documental', en: 'Documentary' },
  'projectType.podcast': { es: 'Podcast', en: 'Podcast' },
  'projectType.commercial': { es: 'Comercial', en: 'Commercial' },
  'projectType.other': { es: 'Otro', en: 'Other' },
  'project.back': { es: 'Volver al Trabajo', en: 'Back to Work' },
  'project.previous': { es: 'Anterior', en: 'Previous' },
  'project.next': { es: 'Siguiente', en: 'Next' },
  'project.notFound': { es: 'Proyecto no encontrado', en: 'Project not found' },
  'project.notFoundDesc': { es: 'El proyecto que buscas no existe.', en: 'The project you are looking for does not exist.' },
  'footer.navigation': { es: 'Navegacion', en: 'Navigation' },
  'footer.connect': { es: 'Conectar', en: 'Connect' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'footer.role': { es: 'Productor de Video y Director de Fotografia', en: 'Video Producer & Cinematographer' },
  'general.home': { es: 'Inicio', en: 'Home' },
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private platformId = inject(PLATFORM_ID);
  
  language = signal<Language>(this.getInitialLanguage());
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        this.applyLanguage(this.language());
      });
    }
  }
  
  private getInitialLanguage(): Language {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('language') as Language;
      if (stored) return stored;
    }
    return 'es';
  }
  
  private applyLanguage(lang: Language): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  }
  
  t(key: string): string {
    const translation = TRANSLATIONS[key];
    if (!translation) return key;
    return translation[this.language()];
  }
  
  toggleLanguage(): void {
    this.language.update(current => current === 'es' ? 'en' : 'es');
  }
  
  isSpanish(): boolean {
    return this.language() === 'es';
  }
  
  isEnglish(): boolean {
    return this.language() === 'en';
  }
}
