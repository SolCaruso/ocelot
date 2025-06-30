import { useState, useEffect } from 'react'

interface BlogPost {
  id: number
  date: string
  title: string
  summary: string
  body: string
  image?: string | null
}

interface CachedPostsData {
  posts: BlogPost[]
  lastUpdated: string
  count: number
}

interface UseRecentPostsReturn {
  posts: BlogPost[]
  loading: boolean
  error: string | null
  lastUpdated: string | null
  refetch: () => Promise<void>
}

export function useRecentPosts(): UseRecentPostsReturn {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/cached-posts.json', {
        next: { revalidate: 3600 } // Revalidate every hour
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch cached posts')
      }
      
      const data: CachedPostsData = await response.json()
      setPosts(data.posts)
      setLastUpdated(data.lastUpdated)
    } catch (err) {
      console.error('Error fetching recent posts:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    loading,
    error,
    lastUpdated,
    refetch
  }
} 