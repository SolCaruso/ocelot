import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const API_ENDPOINT = process.env.API_ENDPOINT;

if (!DISCORD_TOKEN || !CHANNEL_ID || !API_ENDPOINT) {
  console.error('Missing DISCORD_TOKEN, CHANNEL_ID, or API_ENDPOINT in environment variables.');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

// Fixed helper to parse post content
function parsePostContent(post) {
  const content = post.content || post.bodyMd || '';
  
  // Remove frontmatter and extract it
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const frontmatterMatch = content.match(frontmatterRegex);
  let frontmatter = {};
  let body = content;

  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    body = content.replace(frontmatterRegex, "").trim();
    
    // Parse frontmatter lines
    fm.split("\n").forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        // Remove quotes from the value
        frontmatter[key] = value.replace(/^["']|["']$/g, "");
      }
    });
  }

  return {
    ...post, // Keep existing properties like id, slug, author, imageUrl
    title: frontmatter.title || post.title || "Untitled",
    date: frontmatter.date || post.date || "",
    summary: frontmatter.summary || post.summary || "",
    bodyMd: body, // This should be the content without frontmatter
  };
}

client.on('messageCreate', async (message) => {
  if (message.channel.id === CHANNEL_ID && !message.author.bot) {
    try {
      // Fetch latest 10 posts from your API endpoint
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      
      // Save to public/latestPosts.json
      const filePath = path.join(process.cwd(), 'public', 'latestPosts.json');
      const parsedPosts = data.posts.map(parsePostContent);
      
      fs.writeFileSync(filePath, JSON.stringify(parsedPosts, null, 2));
      console.log('Updated latestPosts.json with newest posts!');
    } catch (err) {
      console.error('Failed to update latestPosts.json:', err);
    }
  }
});

client.login(DISCORD_TOKEN);