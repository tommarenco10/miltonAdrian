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
      { title: 'Detrás de Cámaras 01', url: 'https://www.youtube.com/watch?v=HH9lRF_Vp_Q&t=2s' }
    ]
  },
  {
    name: 'Largometraje',
    slug: 'feature-films',
    videos: [
      { title: 'Largometraje 01', url: 'https://www.youtube.com/watch?v=E61oHaGLKIk&list=LL&index=300' },
      { title: 'Largometraje 02', url: 'https://www.youtube.com/watch?v=rU-Ek8oqyOw&t=2150s' }
    ]
  },
  {
    name: 'Sesión en Vivo',
    slug: 'live-session',
    videos: [
      { title: 'Sesión en Vivo 01', url: 'https://www.youtube.com/watch?v=pYmjwwrOZdE' },
      { title: 'Sesión en Vivo 02', url: 'https://www.youtube.com/watch?v=SpfYz1WIvXA&list=LL&index=103' },
      { title: 'Sesión en Vivo 03', url: 'https://www.youtube.com/watch?v=eNefwlhXJeY&list=LL&index=254' },
      { title: 'Sesión en Vivo 04', url: 'https://www.youtube.com/watch?v=s_ID3lCqyN8&list=LL&index=291' },
      { title: 'Sesión en Vivo 05', url: 'https://www.youtube.com/watch?v=6m44QRKlIHQ&list=LL&index=288' },
      { title: 'Sesión en Vivo 06', url: 'https://www.youtube.com/watch?v=xlcVCANrF2Q&list=LL&index=295' },
      { title: 'Sesión en Vivo 07', url: 'https://www.youtube.com/watch?v=pxDezr3py6A' },
      { title: 'Sesión en Vivo 08', url: 'https://www.youtube.com/watch?v=alz29zoqYbg&list=RDalz29zoqYbg&start_radio=1' },
      { title: 'Sesión en Vivo 09', url: 'https://www.youtube.com/watch?v=x3ntKiofDbE' },
      { title: 'Sesión en Vivo 10', url: 'https://www.youtube.com/watch?v=L9C4GLWIxxs&list=RDL9C4GLWIxxs&start_radio=1' },
      { title: 'Sesión en Vivo 11', url: 'https://www.youtube.com/watch?v=81vGcagF1nM' },
      { title: 'Sesión en Vivo 12', url: 'https://www.youtube.com/watch?v=c7C5zKf9G7I&list=RDc7C5zKf9G7I&start_radio=1' },
      { title: 'Sesión en Vivo 13', url: 'https://www.youtube.com/watch?v=u7Fq3Pe_J7M&list=RDu7Fq3Pe_J7M&start_radio=1' },
      { title: 'Sesión en Vivo 14', url: 'https://www.youtube.com/watch?v=vozAWVSGacw&list=RDvozAWVSGacw&start_radio=1' }
    ]
  },
  {
    name: 'Recitales',
    slug: 'recitales',
    videos: [
      { title: 'Recital 01', url: 'https://www.youtube.com/watch?v=5N1ePl_UUqA' },
      { title: 'Recital 02', url: 'https://www.youtube.com/watch?v=bEU0vRFx-p4' },
      { title: 'Recital 03', url: 'https://www.youtube.com/watch?v=B9Z2kmxHoB4&t=2182s' },
      { title: 'Recital 04', url: 'https://www.youtube.com/watch?v=aA4NKcGg_UA&list=LL&index=187' },
      { title: 'Recital 05', url: 'https://www.youtube.com/watch?v=GBqVBO1qzN4' },
      { title: 'Recital 06', url: 'https://www.youtube.com/watch?v=Dg5AsUHdKAg' }
    ]
  },
  {
    name: 'Videoclips',
    slug: 'videoclips',
    videos: [
      { title: 'Videoclip 01', url: 'https://www.youtube.com/watch?v=Sae6GZGgTSM' },
      { title: 'Videoclip 02', url: 'https://www.youtube.com/watch?v=ZR5gQTh3bO8&list=LL&index=290' },
      { title: 'Videoclip 03', url: 'https://www.youtube.com/watch?v=51RrwsHXwuo&list=LL&index=287' },
      { title: 'Videoclip 04', url: 'https://www.youtube.com/watch?v=E61oHaGLKIk&list=LL&index=299' },
      { title: 'Videoclip 05', url: 'https://www.youtube.com/watch?v=7s75elPSMzc&list=LL&index=309' },
      { title: 'Videoclip 06', url: 'https://www.youtube.com/watch?v=2WCwIL4gWy4' },
      { title: 'Videoclip 07', url: 'https://www.youtube.com/watch?v=gVNSFDf7MWE' },
      { title: 'Videoclip 08', url: 'https://www.youtube.com/watch?v=vfyUlizWd-A&list=RDvfyUlizWd-A&start_radio=1' },
      { title: 'Videoclip 09', url: 'https://www.youtube.com/watch?v=G_FZcDR2j7I&list=RDG_FZcDR2j7I&start_radio=1' },
      { title: 'Videoclip 10', url: 'https://www.youtube.com/watch?v=Js8My27xvvA&list=RDJs8My27xvvA&start_radio=1' },
      { title: 'Videoclip 11', url: 'https://www.youtube.com/watch?v=rrFY8-JFmkU&list=RDrrFY8-JFmkU&start_radio=1' },
      { title: 'Videoclip 12', url: 'https://www.youtube.com/watch?v=1Rcg9Gd7mlk&list=RD1Rcg9Gd7mlk&start_radio=1' },
      { title: 'Videoclip 13', url: 'https://www.youtube.com/watch?v=izdBAIQ6vNs' },
      { title: 'Videoclip 14', url: 'https://www.youtube.com/watch?v=wuxa2iTyJtA&list=RDwuxa2iTyJtA&start_radio=1' },
      { title: 'Videoclip 15', url: 'https://www.youtube.com/watch?v=yjlHDPEdNZw' },
      { title: 'Videoclip 16', url: 'https://www.youtube.com/watch?v=Ild5JQ27lT8&list=RDEMsNPwkyPWMb5o5qGCUuNbog&start_radio=1' },
      { title: 'Videoclip 17', url: 'https://www.youtube.com/watch?v=GheZrSQqX0E&list=RDGheZrSQqX0E&start_radio=1' },
      { title: 'Videoclip 18', url: 'https://www.youtube.com/watch?v=c2E-fZSdGBY&list=RDc2E-fZSdGBY&start_radio=1' }
    ]
  },
  {
    name: 'Deportes',
    slug: 'deportes',
    videos: [
      { title: 'Deporte 01', url: 'https://www.youtube.com/watch?v=Y_J_tGG5XzM&list=LL&index=272' }
    ]
  },
  {
    name: 'Redes Sociales',
    slug: 'social-media',
    videos: [
      { title: 'Redes Sociales 01', url: 'https://www.youtube.com/watch?v=ILBxG2ubRHU&list=LL&index=193' }
    ]
  },
  {
    name: 'Podcasts',
    slug: 'podcasts',
    videos: [
      { title: 'Podcast 01', url: 'https://www.youtube.com/watch?v=H-Hf2O3ZJ6w' },
      { title: 'Podcast 02', url: 'https://www.youtube.com/watch?v=R5Q6f8K-3Qw' },
      { title: 'Podcast 03', url: 'https://www.youtube.com/watch?v=K9Vfy8T3qYo' }
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
    thumbnail: getYouTubeThumbnail(videoId)
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

export function getFeaturedProjects(count: number = 6): Project[] {
  const shuffled = [...PROJECTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}
