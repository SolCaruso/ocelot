import BlogPageClient from '../../components/updates/BlogPageClient';

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const res = await fetch(`${baseUrl}/api/discord-sync/posts?limit=1`, { cache: 'no-store' });
  const data = await res.json();
  return data.posts[0];
}

export default async function UpdatesPage() {
  const heroPost = await fetchHeroPost();
  return <BlogPageClient heroPost={heroPost} />;
}
