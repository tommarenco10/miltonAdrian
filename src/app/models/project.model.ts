export interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  description: string;
  videoUrl: string;
  thumbnail?: string;
}

export interface Category {
  name: string;
  slug: string;
  projects: Project[];
}
