# Blog Cache System

This system allows you to fetch the 10 most recent blog posts from Supabase and cache them locally for better performance.

## How it works

1. **Caching**: Blog posts are fetched from Supabase and saved to `public/cached-posts.json`
2. **Performance**: Components load from the cached JSON file instead of making database calls
3. **Updates**: Run a script to update the cache when new posts are added

## Usage

### 1. Update the cache manually

```bash
npm run update-blog-cache
```

This will:
- Fetch the 10 most recent posts from Supabase
- Save them to `public/cached-posts.json`
- Show you which posts were cached

### 2. Use cached posts in components

```tsx
import { useRecentPosts } from '@/hooks/useRecentPosts'

function MyComponent() {
  const { posts, loading, error, lastUpdated, refetch } = useRecentPosts()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Server-side usage

```tsx
import { getCachedPosts } from '@/lib/actions'

// In a server component or API route
const { posts, error } = await getCachedPosts()
```

## Automatic Updates

### Option 1: Build-time updates

Add to your build script in `package.json`:

```json
{
  "scripts": {
    "prebuild": "npm run update-blog-cache",
    "build": "next build"
  }
}
```

### Option 2: GitHub Actions (for production)

Create `.github/workflows/update-blog-cache.yml`:

```yaml
name: Update Blog Cache

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:  # Manual trigger

jobs:
  update-cache:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run update-blog-cache
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add public/cached-posts.json
          git commit -m "Update blog cache" || exit 0
          git push
```

### Option 3: Supabase Database Webhooks

Set up a webhook in Supabase that triggers when blog posts are updated:

1. Go to your Supabase dashboard
2. Navigate to Database > Webhooks
3. Create a new webhook for the `blog_posts` table
4. Point it to your deployment's API endpoint that runs the cache update

## Cache Structure

The cached file (`public/cached-posts.json`) has this structure:

```json
{
  "posts": [
    {
      "id": 1,
      "date": "2024-01-15",
      "title": "Blog Post Title",
      "summary": "Blog post summary...",
      "body": "Full blog post content...",
      "image": "/path/to/image.jpg"
    }
  ],
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "count": 10
}
```

## Benefits

- **Faster loading**: No database calls on every page load
- **Better SEO**: Static content is better for search engines
- **Reduced database load**: Fewer queries to Supabase
- **Offline capability**: Content works even if database is down
- **Cost effective**: Reduces Supabase usage

## Troubleshooting

### Cache not updating
- Check your Supabase credentials in `.env.local`
- Ensure the `blog_posts` table exists and has data
- Run `npm run update-blog-cache` manually to see any errors

### Posts not showing
- Verify the cache file exists at `public/cached-posts.json`
- Check the browser console for fetch errors
- Ensure your component is using the `useRecentPosts` hook correctly 