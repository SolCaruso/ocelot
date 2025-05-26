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

client.on('messageCreate', async (message) => {
  if (message.channel.id === CHANNEL_ID && !message.author.bot) {
    try {
      // Fetch latest 10 posts from your API endpoint
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
      // Save to public/latestPosts.json
      const filePath = path.join(process.cwd(), 'public', 'latestPosts.json');
      fs.writeFileSync(filePath, JSON.stringify(data.posts, null, 2));
      console.log('Updated latestPosts.json with newest posts!');
    } catch (err) {
      console.error('Failed to update latestPosts.json:', err);
    }
  }
});

client.login(DISCORD_TOKEN); 