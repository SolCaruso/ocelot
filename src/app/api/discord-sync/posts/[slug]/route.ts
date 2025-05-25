import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
const CHANNEL_ID = process.env.CHANNEL_ID!;

// Fix the params type to match Next.js expectations
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages/${slug}`,
      {
        headers: { Authorization: `Bot ${DISCORD_TOKEN}` },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Discord API error: ${res.status}` },
        { status: 502 }
      );
    }

    const m = await res.json();

    // Parse message as in your page
    const raw = m.content.trim();
    const bodyMd = raw.startsWith('```md')
      ? raw.replace(/^```md/, '').replace(/```$/, '').trim()
      : raw;

    const lines = bodyMd.split('\n').map((l: string) => l.trim());
    const titleLine = lines.find((l: string) => l.startsWith('# ')) || '';
    const title = titleLine.replace(/^#\s*/, '') || 'Untitled';
    const summary =
      lines
        .slice(lines.indexOf(titleLine) + 1)
        .find((l: string) => !!l && !l.startsWith('```')) || '';

    const imageUrl = m.attachments[0]?.url ?? '/jpg/post.jpg';

    return NextResponse.json({
      id: m.id,
      author: m.author?.username ?? '',
      date: m.timestamp,
      title,
      summary,
      bodyMd,
      imageUrl,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}