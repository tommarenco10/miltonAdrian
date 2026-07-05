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
  'home.bioP1': { es: 'Más de una década creando historias para cine, televisión, música y plataformas digitales.', en: 'For more than a decade, I have been crafting stories for film, television, music, and digital platforms.' },
  'home.bioP2': { es: 'Actualmente trabajo en <strong class="text-black dark:text-white font-semibold">Warner Bros. Discovery</strong> como MOC Operator &amp; QC Ingest, formo parte del equipo de <strong class="text-black dark:text-white font-semibold">La Fábrica del Podcast</strong> y fui Director de cámaras y Operador de Cámara en las transmisiones oficiales del <strong class="text-black dark:text-white font-semibold">Hipódromo Argentino de Palermo</strong>, cubriendo Grandes Premios y eventos hípicos de alcance nacional.', en: 'I currently work at <strong class="text-black dark:text-white font-semibold">Warner Bros. Discovery</strong> as a MOC Operator &amp; QC Ingest Specialist. I am also part of the <strong class="text-black dark:text-white font-semibold">La Fábrica del Podcast</strong> team, and I previously worked as a Camera Director and Camera Operator for the official broadcasts of the <strong class="text-black dark:text-white font-semibold">Hipódromo Argentino de Palermo</strong>, covering major racing events and national horse racing competitions.' },
  'home.bioP3': { es: 'Mi experiencia abarca la dirección de videoclips, documentales, contenido comercial, podcasts y eventos en vivo, combinando una mirada cinematográfica con la precisión técnica necesaria para producir contenidos de alto impacto.', en: 'My experience includes directing music videos, documentaries, commercial content, podcasts, and live events, combining a cinematic vision with the technical precision required to deliver high-impact productions.' },
  'about.bioP1': { es: 'Milton Adrián Cañete es Director de Fotografía, Realizador Audiovisual y Productor con más de 15 años de experiencia desarrollando proyectos para cine, televisión, música, plataformas digitales y eventos en vivo.', en: 'Milton Adrián Cañete is a Director of Photography, Filmmaker, and Producer with over 15 years of experience creating projects for film, television, music, digital platforms, and live events.' },
  'about.bioP2': { es: 'A lo largo de su carrera dirigió videoclips, documentales, contenido comercial, sesiones en vivo y producciones audiovisuales para artistas, marcas y empresas, construyendo un estilo visual donde la narrativa cinematográfica, la iluminación y el movimiento de cámara son protagonistas.', en: 'Throughout his career, he has directed music videos, documentaries, commercial productions, live sessions, and audiovisual content for artists, brands, and companies, developing a distinctive visual style where cinematic storytelling, lighting, and camera movement take center stage.' },
  'about.bioP3': { es: 'Actualmente forma parte de <strong class="text-black dark:text-white font-semibold">Warner Bros. Discovery</strong> como MOC Operator &amp; QC Ingest, participando en los procesos técnicos y de control de calidad de contenidos para una de las compañías de entretenimiento más importantes del mundo.', en: 'He currently works at <strong class="text-black dark:text-white font-semibold">Warner Bros. Discovery</strong> as a MOC Operator &amp; QC Ingest Specialist, contributing to the technical operations and quality control processes for one of the world\'s leading entertainment companies.' },
  'about.bioP4': { es: 'También integra el equipo de <strong class="text-black dark:text-white font-semibold">La Fábrica del Podcast</strong>, realizando la producción audiovisual de reconocidos podcasts como La Guita, El Campo, El Fútbol, El Ladrillo, Al Horno y La Rosca, entre otros.', en: 'He is also part of the <strong class="text-black dark:text-white font-semibold">La Fábrica del Podcast</strong> team, producing audiovisual content for well-known podcasts such as La Guita, El Campo, El Fútbol, El Ladrillo, Al Horno, and La Rosca, among others.' },
  'about.bioP5': { es: 'Además, trabajó en el <strong class="text-black dark:text-white font-semibold">Hipódromo Argentino de Palermo</strong> como Operador de Cámara y Director de cámaras en Grandes Premios, transmisiones y entregas hípicas, liderando coberturas en vivo de alta exigencia técnica.', en: 'In addition, he worked at the <strong class="text-black dark:text-white font-semibold">Hipódromo Argentino de Palermo</strong> as both a Camera Operator and Camera Director, leading live coverage of prestigious racing events, broadcasts, and award ceremonies that demanded the highest technical standards.' },
  'about.bioP6': { es: 'Su experiencia combina creatividad, dirección, fotografía y dominio técnico, permitiéndole liderar producciones de principio a fin: desde el desarrollo de la idea hasta la entrega final, siempre con estándares de calidad profesional.', en: 'His expertise combines creativity, directing, cinematography, and technical excellence, enabling him to lead productions from concept development to final delivery while consistently maintaining professional-quality standards.' },
  'work.title': { es: 'MI', en: 'MY' },
  'work.subtitle': { es: 'TRABAJO', en: 'WORK' },
  'work.description': { es: 'Una coleccion de videos musicales, sesiones en vivo, largometrajes, documentales y mas.', en: 'A collection of music videos, live sessions, feature films, documentaries, and more.' },
  'work.allProjects': { es: 'Todos los Proyectos', en: 'All Projects' },
  'about.title': { es: 'SOBRE', en: 'ABOUT' },
  'about.bio': { es: 'Biografia', en: 'Biography' },
  'about.bioText': { es: 'Milton Adrián Cañete es Director de Fotografía, Realizador Audiovisual y Productor con más de 15 años de experiencia desarrollando proyectos para cine, televisión, música, plataformas digitales y eventos en vivo.', en: 'Milton Adrián Cañete is a Director of Photography, Audiovisual Producer with over 15 years of experience developing projects for film, television, music, digital platforms, and live events.' },
  'about.jobTitle': { es: 'Director de Fotografía y Realizador Audiovisual', en: 'Director of Photography & Audiovisual Producer' },
  'about.skills': { es: 'Especialidades', en: 'Specialties' },
  'about.connect': { es: 'Conectar', en: 'Connect' },
  'about.letsWorkTogether': { es: 'Trabajemos Juntos', en: 'Lets Work Together' },
  'about.collaboration': { es: 'Interesado en colaborar en tu proximo proyecto? Siempre estoy abierto a discutir nuevas oportunidades.', en: 'Interested in collaborating on your next project? I am always open to discussing new opportunities.' },
  'about.emailMe': { es: 'Escribeme', en: 'Email Me' },
  'about.followInstagram': { es: 'Seguir en Instagram', en: 'Follow on Instagram' },
  'contact.title1': { es: 'PONETE EN', en: 'GET IN' },
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
  'contact.sending': { es: 'Enviando...', en: 'Sending...' },
  'contact.error': { es: 'Error al enviar el mensaje. Intenta de nuevo.', en: 'Failed to send message. Please try again.' },
  'project.back': { es: 'Volver al Trabajo', en: 'Back to Work' },
  'project.previous': { es: 'Anterior', en: 'Previous' },
  'project.next': { es: 'Siguiente', en: 'Next' },
  'project.notFound': { es: 'Proyecto no encontrado', en: 'Project not found' },
  'project.notFoundDesc': { es: 'El proyecto que buscas no existe.', en: 'The project you are looking for does not exist.' },
  'footer.navigation': { es: 'Navegacion', en: 'Navigation' },
  'footer.connect': { es: 'Conectar', en: 'Connect' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'footer.role': { es: 'Director de Fotografía y Realizador Audiovisual', en: 'Director of Photography & Audiovisual Producer' },
  'general.home': { es: 'Inicio', en: 'Home' },
  'category.behindTheScenes': { es: 'Detras de Camaras', en: 'Behind the Scenes' },
  'category.featureFilms': { es: 'Largometraje', en: 'Feature Films' },
  'category.liveSession': { es: 'Sesion en Vivo', en: 'Live Session' },
  'category.recitales': { es: 'Recitales', en: 'Concerts' },
  'category.videoclips': { es: 'Videoclips', en: 'Music Videos' },
  'category.deportes': { es: 'Deportes', en: 'Sports' },
  'category.socialMedia': { es: 'Redes Sociales', en: 'Social Media' },
  'category.podcasts': { es: 'Podcasts', en: 'Podcasts' },
  'about.skill1': { es: 'Dirección de Fotografía', en: 'Director of Photography' },
  'about.skill2': { es: 'Dirección de Videoclips', en: 'Music Video Direction' },
  'about.skill3': { es: 'Producción Audiovisual', en: 'Audiovisual Production' },
  'about.skill4': { es: 'Documentales', en: 'Documentary Filmmaking' },
  'about.skill5': { es: 'Podcasts', en: 'Podcast Production' },
  'about.skill6': { es: 'Publicidad y contenido para marcas', en: 'Commercials & Branded Content' },
  'about.skill7': { es: 'Coberturas en vivo', en: 'Live Event Coverage' },
  'about.skill8': { es: 'Dirección de cámaras (Broadcast)', en: 'Broadcast Camera Direction' },
  'about.skill9': { es: 'Operación de cámara', en: 'Camera Operation' },
  'about.skill10': { es: 'Edición y Color', en: 'Video Editing & Color Grading' },
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
