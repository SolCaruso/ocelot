import { allPosts as rawPosts } from 'contentlayer/generated'

export const getPosts = () => {
  const slugCount: Record<string, number> = {}
  return rawPosts.map((post) => {
    const base = post.slugBase
    const count = slugCount[base] || 0
    const finalSlug = count === 0 ? base : `${base}-${count}`
    slugCount[base] = count + 1
    return {
      ...post,
      slug: finalSlug,
    }
  })
}