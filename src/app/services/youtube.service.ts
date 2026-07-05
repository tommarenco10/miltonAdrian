import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private cache = new Map<string, string>();
  private loading = new Set<string>();

  getCachedTitle(videoId: string): string | null {
    if (this.cache.has(videoId)) return this.cache.get(videoId)!;
    const stored = localStorage.getItem(`yt_title_${videoId}`);
    if (stored) {
      this.cache.set(videoId, stored);
      return stored;
    }
    return null;
  }

  async ensureTitle(videoUrl: string): Promise<string | null> {
    const match = videoUrl.match(/[?&]v=([^&]+)/);
    if (!match) return null;
    const id = match[1];

    const cached = this.getCachedTitle(id);
    if (cached) return cached;
    if (this.loading.has(id)) return null;

    this.loading.add(id);
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
      );
      const data = await res.json();
      const title = data?.title || '';
      this.cache.set(id, title);
      localStorage.setItem(`yt_title_${id}`, title);
      return title;
    } catch {
      return null;
    } finally {
      this.loading.delete(id);
    }
  }

  async populateTitles(projects: Project[]): Promise<void> {
    const needFetch: string[] = [];

    for (const project of projects) {
      if (project.title) continue;
      const match = project.videoUrl.match(/[?&]v=([^&]+)/);
      if (!match) continue;
      const id = match[1];

      const cached = this.getCachedTitle(id);
      if (cached) {
        project.title = cached;
        continue;
      }

      if (!this.loading.has(id)) {
        this.loading.add(id);
        needFetch.push(id);
      }
    }

    if (needFetch.length === 0) return;

    const results = await Promise.allSettled(
      needFetch.map(id =>
        fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
          .then(r => r.json())
          .then(d => ({ id, title: d?.title || '' }))
      )
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        const { id, title } = result.value;
        this.cache.set(id, title);
        localStorage.setItem(`yt_title_${id}`, title);
      }
    }

    for (const id of needFetch) this.loading.delete(id);

    for (const project of projects) {
      if (project.title) continue;
      const match = project.videoUrl.match(/[?&]v=([^&]+)/);
      if (match && this.cache.has(match[1])) {
        project.title = this.cache.get(match[1])!;
      }
    }
  }
}
