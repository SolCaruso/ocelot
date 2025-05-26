import BlogPageClient from '../../components/updates/BlogPageClient';
import fs from 'fs/promises';
import path from 'path';

interface DiscordPost {
  id: string;
  slug: string;
  author: string;
  date: string;
  title: string;
  summary: string;
  bodyMd: string;
  imageUrl: string | null;
}

async function fetchHeroPost(): Promise<DiscordPost> {
  // Try to load from latestPosts.json first
  try {
    const filePath = path.join(process.cwd(), 'public', 'latestPosts.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const posts = JSON.parse(file);
    if (posts && posts.length > 0) {
      return posts[0];
    }
  } catch (err) {
    // Ignore and fall back to API
  }
  // Fallback to API fetch
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/discord-sync/posts?limit=1`, { cache: 'no-store' });
  const data = await res.json();
  return data.posts[0];
}

export default async function UpdatesPage() {
  const heroPost = await fetchHeroPost();
  return <BlogPageClient heroPost={heroPost} />;
}
