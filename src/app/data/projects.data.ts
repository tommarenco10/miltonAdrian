import { Project, Category } from '../models/project.model';
export type { Project, Category };

const YOUTUBE_BASE = 'https://www.youtube.com/watch?v=';

function extractVideoId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : '';
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

interface RawVideo {
  title: string;
  url: string;
  group?: string;
}

interface RawCategory {
  name: string;
  slug: string;
  videos: RawVideo[];
}

const RAW_CATEGORIES: RawCategory[] = [
  {
    name: 'Detrás de Cámaras',
    slug: 'behind-the-scenes',
    videos: [
      { title: '', url: 'https://www.youtube.com/watch?v=HH9lRF_Vp_Q&t=2s' }
    ]
  },
  {
    name: 'Largometraje',
    slug: 'feature-films',
    videos: [
      { title: '', url: 'https://www.youtube.com/watch?v=E61oHaGLKIk&list=LL&index=300' },
      { title: '', url: 'https://www.youtube.com/watch?v=rU-Ek8oqyOw&t=2150s' }
    ]
  },
  {
    name: 'Sesión en Vivo',
    slug: 'live-session',
    videos: [
      { title: '', url: 'https://www.youtube.com/watch?v=pYmjwwrOZdE' },
      { title: '', url: 'https://www.youtube.com/watch?v=SpfYz1WIvXA&list=LL&index=103' },
      { title: '', url: 'https://www.youtube.com/watch?v=eNefwlhXJeY&list=LL&index=254' },
      { title: '', url: 'https://www.youtube.com/watch?v=s_ID3lCqyN8&list=LL&index=291' },
      { title: '', url: 'https://www.youtube.com/watch?v=6m44QRKlIHQ&list=LL&index=288' },
      { title: '', url: 'https://www.youtube.com/watch?v=xlcVCANrF2Q&list=LL&index=295' },
      { title: '', url: 'https://www.youtube.com/watch?v=pxDezr3py6A' },
      { title: '', url: 'https://www.youtube.com/watch?v=alz29zoqYbg&list=RDalz29zoqYbg&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=x3ntKiofDbE' },
      { title: '', url: 'https://www.youtube.com/watch?v=L9C4GLWIxxs&list=RDL9C4GLWIxxs&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=81vGcagF1nM' },
      { title: '', url: 'https://www.youtube.com/watch?v=c7C5zKf9G7I&list=RDc7C5zKf9G7I&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=u7Fq3Pe_J7M&list=RDu7Fq3Pe_J7M&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=vozAWVSGacw&list=RDvozAWVSGacw&start_radio=1' }
    ]
  },
  {
    name: 'Recitales',
    slug: 'recitales',
    videos: [
      { title: '', url: 'https://www.youtube.com/watch?v=5N1ePl_UUqA' },
      { title: '', url: 'https://www.youtube.com/watch?v=bEU0vRFx-p4' },
      { title: '', url: 'https://www.youtube.com/watch?v=B9Z2kmxHoB4&t=2182s' },
      { title: '', url: 'https://www.youtube.com/watch?v=aA4NKcGg_UA&list=LL&index=187' },
      { title: '', url: 'https://www.youtube.com/watch?v=GBqVBO1qzN4' },
      { title: '', url: 'https://www.youtube.com/watch?v=Dg5AsUHdKAg' }
    ]
  },
  {
    name: 'Videoclips',
    slug: 'videoclips',
    videos: [
      { title: '', url: 'https://www.youtube.com/watch?v=Sae6GZGgTSM' },
      { title: '', url: 'https://www.youtube.com/watch?v=ZR5gQTh3bO8&list=LL&index=290' },
      { title: '', url: 'https://www.youtube.com/watch?v=51RrwsHXwuo&list=LL&index=287' },
      { title: '', url: 'https://www.youtube.com/watch?v=E61oHaGLKIk&list=LL&index=299' },
      { title: '', url: 'https://www.youtube.com/watch?v=7s75elPSMzc&list=LL&index=309' },
      { title: '', url: 'https://www.youtube.com/watch?v=2WCwIL4gWy4' },
      { title: '', url: 'https://www.youtube.com/watch?v=gVNSFDf7MWE' },
      { title: '', url: 'https://www.youtube.com/watch?v=vfyUlizWd-A&list=RDvfyUlizWd-A&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=G_FZcDR2j7I&list=RDG_FZcDR2j7I&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=Js8My27xvvA&list=RDJs8My27xvvA&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=rrFY8-JFmkU&list=RDrrFY8-JFmkU&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=1Rcg9Gd7mlk&list=RD1Rcg9Gd7mlk&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=izdBAIQ6vNs' },
      { title: '', url: 'https://www.youtube.com/watch?v=wuxa2iTyJtA&list=RDwuxa2iTyJtA&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=yjlHDPEdNZw' },
      { title: '', url: 'https://www.youtube.com/watch?v=Ild5JQ27lT8&list=RDEMsNPwkyPWMb5o5qGCUuNbog&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=GheZrSQqX0E&list=RDGheZrSQqX0E&start_radio=1' },
      { title: '', url: 'https://www.youtube.com/watch?v=c2E-fZSdGBY&list=RDc2E-fZSdGBY&start_radio=1' }
    ]
  },
  {
    name: 'Deportes',
    slug: 'deportes',
    videos: [
      { title: '', url: 'https://www.youtube.com/watch?v=Y_J_tGG5XzM&list=LL&index=272' }
    ]
  },
  {
    name: 'Redes Sociales',
    slug: 'social-media',
    videos: [
      { title: '', url: 'https://www.youtube.com/watch?v=ILBxG2ubRHU&list=LL&index=193' }
    ]
  },
  {
    name: 'Podcasts',
    slug: 'podcasts',
    videos: [
      { title: 'Industrial & Agroindustrial', url: 'https://www.youtube.com/watch?v=FIGtfuq3TKI', group: 'Mesaza Podcast' },
      { title: 'Industrial & Agroindustrial', url: 'https://www.youtube.com/watch?v=pEdfwjJ5cmI', group: 'Mesaza Podcast' },
      { title: 'Industrial & Agroindustrial', url: 'https://www.youtube.com/watch?v=43WxWb97dOA', group: 'Mesaza Podcast' },
      { title: 'Industrial & Agroindustrial', url: 'https://www.youtube.com/watch?v=Q9NYnDuw2gk', group: 'Mesaza Podcast' },
      { title: 'Macri', url: 'https://www.youtube.com/watch?v=G8wBkNKE3RE', group: 'La Fábrica' },
      { title: 'Los Hermanos Chela', url: 'https://www.youtube.com/watch?v=asPu2R5TT7s', group: 'La Fábrica' },
      { title: 'Ochiato', url: 'https://www.youtube.com/watch?v=mZmLHm1jhbw', group: 'La Fábrica' },
      { title: 'Avila', url: 'https://www.youtube.com/watch?v=vOHq1fTaiMs', group: 'La Fábrica' },
      { title: 'Daniel Hadasd', url: 'https://www.youtube.com/watch?v=vSefDi2eAD8', group: 'La Fábrica' },
      { title: 'Eduardo Constantini', url: 'https://www.youtube.com/watch?v=3hhfwQ_Sxi4', group: 'La Fábrica' },
      { title: 'Mercedes Benz', url: 'https://www.youtube.com/watch?v=f-KjR0urtp0', group: 'La Fábrica' },
      { title: 'Big One', url: 'https://www.youtube.com/watch?v=txGytiN46bs', group: 'La Fábrica' },
      { title: 'Checho Batista', url: 'https://www.youtube.com/watch?v=F_ZPd67L59c', group: 'El Fútbol' },
      { title: 'Astrada', url: 'https://www.youtube.com/watch?v=UwzS7QyIToc', group: 'El Fútbol' },
      { title: 'Antonio Careca', url: 'https://www.youtube.com/watch?v=UdH54qqg52Q', group: 'El Fútbol' },
      { title: 'Bambino Pons', url: 'https://www.youtube.com/watch?v=jSj4nPMcOIY', group: 'El Fútbol' },
      { title: 'Cristofe', url: 'https://www.youtube.com/watch?v=KedmXI-3f0I', group: 'Al Horno' },
      { title: 'Fou Si Sonsson', url: 'https://www.youtube.com/watch?v=7F7Ai54GBm0', group: 'Al Horno' },
      { title: 'Chica del Brunch', url: 'https://www.youtube.com/watch?v=tIOMZBguG9g', group: 'Al Horno' },
      { title: 'Narda Lepes', url: 'https://www.youtube.com/watch?v=h2ZO3Y1BQDo', group: 'Al Horno' },
      { title: 'Presidente La Rural', url: 'https://www.youtube.com/watch?v=2mDM2zq24Wc', group: 'El Campo' },
      { title: 'Ex Puma', url: 'https://www.youtube.com/watch?v=wIfiP9nGVAU', group: 'El Campo' },
      { title: 'Loco por el Asado', url: 'https://www.youtube.com/watch?v=Os4t7Q-fS3c', group: 'El Campo' },
      { title: 'Leo Ponzio', url: 'https://www.youtube.com/watch?v=EjhRlg9v7Tw', group: 'El Campo' },
      { title: 'El Ladrillo 01', url: 'https://www.youtube.com/watch?v=RwY6vkPqtrI', group: 'El Ladrillo' },
      { title: 'El Ladrillo 02', url: 'https://www.youtube.com/watch?v=kpoi5RVmIQc', group: 'El Ladrillo' },
      { title: 'El Ladrillo 03', url: 'https://www.youtube.com/watch?v=hF_9kgzh-qg', group: 'El Ladrillo' },
      { title: 'El Ladrillo 04', url: 'https://www.youtube.com/watch?v=TboSGqDppLg', group: 'El Ladrillo' },
      { title: 'Presidente de la Bolsa', url: 'https://www.youtube.com/watch?v=WNVgv3od1v0', group: 'La Guita' },
      { title: 'Bulat', url: 'https://www.youtube.com/watch?v=4D6feo0AkWA', group: 'La Guita' },
      { title: 'Amslaton', url: 'https://www.youtube.com/watch?v=2447GX5d1o4', group: 'La Guita' },
      { title: 'Cuevero', url: 'https://www.youtube.com/watch?v=dapazPOL9Rk', group: 'La Guita' },
      { title: 'La Rosca 01', url: 'https://www.youtube.com/watch?v=3Hjd7VYtQn8', group: 'La Rosca' },
      { title: 'Larreta', url: 'https://www.youtube.com/watch?v=5ZLuiKm-gw4', group: 'La Rosca' },
      { title: 'La Rosca 03', url: 'https://www.youtube.com/watch?v=mYoY9w_IvFE', group: 'La Rosca' }
    ]
  }
];

const DESCRIPTIONS = [
  'A creative visual journey capturing the essence of music through dynamic cinematography and careful attention to light and shadow.',
  'An immersive production experience that brings together performance and visual storytelling in perfect harmony.',
  'Documentary-style cinematography meeting modern editing techniques to create a compelling narrative.',
  'High-energy visuals with cinematic grading that captures the raw emotion of live performance.',
  'Carefully crafted visual language that complements the artistic vision and musical composition.',
  'A collaborative effort between artist and cinematographer to create memorable visual moments.',
  'Technical excellence meets creative vision in this production showcasing expert camera work.',
  'Innovative visual approach combining traditional cinematography with modern techniques.'
];

let projectId = 0;
let descIndex = 0;
const years = [2022, 2023, 2024, 2025];

function createProject(rawVideo: RawVideo, categoryName: string, index: number): Project {
  const videoId = extractVideoId(rawVideo.url);
  const id = `project-${++projectId}`;
  const year = years[Math.floor(Math.random() * years.length)];
  
  return {
    id,
    title: rawVideo.title,
    category: categoryName,
    year,
    description: DESCRIPTIONS[descIndex++ % DESCRIPTIONS.length],
    videoUrl: rawVideo.url,
    thumbnail: getYouTubeThumbnail(videoId),
    group: rawVideo.group
  };
}

export const PROJECTS: Project[] = [];
export const CATEGORIES: Category[] = [];

RAW_CATEGORIES.forEach(rawCategory => {
  const projects = rawCategory.videos.map((video, index) => 
    createProject(video, rawCategory.name, index)
  );
  
  PROJECTS.push(...projects);
  
  CATEGORIES.push({
    name: rawCategory.name,
    slug: rawCategory.slug,
    projects
  });
});

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find(p => p.id === id);
}

export function getProjectsByCategory(categorySlug: string): Project[] {
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  return category?.projects || [];
}

// ============================================================
// ★ VIDEOS DESTACADOS EN HOME
// Editá los IDs de YouTube y los títulos que quieras mostrar
// ============================================================
export const FEATURED_VIDEO_IDS: string[] = [
  'c2E-fZSdGBY',      // Fila 1 - Col 1
  'x3ntKiofDbE',      // Fila 1 - Col 2
  '1Rcg9Gd7mlk',      // Fila 1 - Col 3
  'GheZrSQqX0E',      // Fila 1 - Col 4
  's7OvZemkmyU',      // Fila 2 - Col 1
  'Ild5JQ27lT8',      // Fila 2 - Col 2
  'HH9lRF_Vp_Q',      // Fila 2 - Col 3
  'SpfYz1WIvXA',      // Fila 2 - Col 4
  'rrFY8-JFmkU',      // Fila 3 - Col 1
  't5fBlKQyn2s',      // Fila 3 - Col 2
  'G_FZcDR2j7I',      // Fila 3 - Col 3
  'Js8My27xvvA',      // Fila 3 - Col 4
  'vfyUlizWd-A',      // Fila 4 - Col 1
  'F9CiBCo4Wn8',      // Fila 4 - Col 2
  'GBqVBO1qzN4',      // Fila 4 - Col 3
  'wuxa2iTyJtA',      // Fila 4 - Col 4
];

// ============================================================
// ★ TÍTULOS PERSONALIZADOS - Poné acá los títulos que querés
// que aparezcan en hover. Dejá '' si no querés título para ese.
// Mismo orden que FEATURED_VIDEO_IDS (1 por video).
// Ej: 'Mi Video Favorito', 'Concierto en Vivo 2024', ''
// ============================================================
export const FEATURED_VIDEO_TITLES: string[] = [
  'Perro Dragón - Imparable (Video Oficial)',           // Fila 1 - Col 1
  'No estoy tan bien - C.A.OS Música',                  // Fila 1 - Col 2
  'DE LA COVACHA - MICHELUTTI - Video Oficial',         // Fila 1 - Col 3
  'Perro Dragón - Verano (Official Video)',             // Fila 1 - Col 4
  'MANTO - FESTEJAR VIDEO OFICIAL',                     // Fila 2 - Col 1
  'Larry Zavala - Mala Jugada',                         // Fila 2 - Col 2
  'La ReVelión de los Borregos - Manu Michelutti EPK', // Fila 2 - Col 3
  'COMO AYER - Filisteo',                               // Fila 2 - Col 4
  'Alejsca - Prostitutas o Brujas (video oficial)',     // Fila 3 - Col 1
  'SOBRE EL ABISMO - C.A.OS Música',                    // Fila 3 - Col 2
  'BASTA - PERCHA983 - VIDEOCLIP OFICIAL',              // Fila 3 - Col 3
  'Veneno - ECTASY (Videoclip Oficial)',                // Fila 3 - Col 4
  'CHRISTIAN OSCARI - DESTINO COBARDE',                 // Fila 4 - Col 1
  'Dos Intoxicados - Mi inteligencia intrapersonal',    // Fila 4 - Col 2
  'Memphis La Blusera - La Flor Más Bella (En Vivo)',   // Fila 4 - Col 3
  'CHAVY PROJECT - ELLA (VIDEO OFICIAL)',               // Fila 4 - Col 4
];

export function getFeaturedProjects(count: number = 6): Project[] {
  const shuffled = [...PROJECTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getFixedFeaturedProjects(): Project[] {
  return FEATURED_VIDEO_IDS.map((videoId, index) => {
    const manualTitle = FEATURED_VIDEO_TITLES[index] || '';
    const existing = PROJECTS.find(p => {
      const match = p.videoUrl.match(/[?&]v=([^&]+)/);
      return match !== null && match[1] === videoId;
    });
    if (existing) return { ...existing, title: manualTitle || '' };
    return {
      id: `featured-${index + 1}`,
      title: manualTitle || '',
      category: 'Destacado',
      year: new Date().getFullYear(),
      description: '',
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: getYouTubeThumbnail(videoId)
    };
  });
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
