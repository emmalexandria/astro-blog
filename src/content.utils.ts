import { getCollection, type CollectionEntry } from "astro:content";
import fs from "fs"
import path from "path";

type PostFrontmatter = CollectionEntry<"blog">["data"];

export interface PostListItem {
  id: string,
  isSeries: boolean
  posts?: CollectionEntry<"blog">[]
  data: PostFrontmatter
}

const sortPostListByDate = (items: PostListItem[]) => {
  items.sort((a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

const getPostsOfSeries = (series: CollectionEntry<"series">, posts: CollectionEntry<"blog">[]) => {
  return posts.filter((p) => {
    return p.data.series === series.data.name
  })
}

const seriesToPostListItem = (series: CollectionEntry<"series">, posts: CollectionEntry<"blog">[]): PostListItem | undefined => {
  const seriesPosts = getPostsOfSeries(series, posts);
  if (seriesPosts.length === 0) {
    return
  }
  const pubDate = seriesPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())[0]?.data.pubDate
  const updatedDate = seriesPosts.filter((p) => p.data.updatedDate !== undefined).sort((a, b) => {
    return (b.data.updatedDate ?? b.data.pubDate).valueOf() - (a.data.updatedDate ?? b.data.pubDate).valueOf()
  }).filter((d) => d !== undefined)[0]?.data.updatedDate
  const tags = seriesPosts.flatMap((p) => p.data.tags).filter((t) => t !== undefined)
  const uniqueTags = tags.filter((t, i) => {
    return tags.indexOf(t) === i
  })

  return {
    id: series.id,
    isSeries: true,
    posts: seriesPosts.sort((a, b) => (a.data.index ?? 0) - (b.data.index ?? 0)),
    data: {
      title: series.data.name,
      description: series.data.description,
      pubDate,
      updatedDate,
      tags: uniqueTags,
      image: series.data.image
    }
  }


}

export const dynamicPostFilter = (allPosts: CollectionEntry<'blog'>[]) => {
  return allPosts.filter((post) => {
    if (import.meta.env.PROD) {
      return !post.data.draft
    }

    return true
  })

}

export const getPostsAndSeries = async (): Promise<PostListItem[]> => {
  const allPosts = dynamicPostFilter(await getCollection("blog"))
  const standalonePosts = allPosts.filter((p) => p.data.series === undefined)
  const series = await getCollection("series")

  const seriesItems = series.map((s) => {
    return seriesToPostListItem(s, allPosts)
  }).filter((s) => s !== undefined)
  const postItems: PostListItem[] = standalonePosts.map((p) => {
    return {
      ...p,
      isSeries: false,
    }
  })

  return [
    ...seriesItems,
    ...postItems
  ]
}





