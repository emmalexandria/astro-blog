import { getCollection, type CollectionEntry } from "astro:content";

type PostFrontmatter = CollectionEntry<"blog">["data"];

export interface PostListItem {
  id: string,
  data: PostFrontmatter
}

const sortPostListByDate = (items: PostListItem[]) => {
  items.sort((a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

const getPostsOfSeries = (series: CollectionEntry<"series">, posts: CollectionEntry<"blog">[]) => {
  console.log(posts.length)
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

  return {
    id: series.id,
    data: {
      title: series.data.name,
      description: series.data.description,
      pubDate,
      updatedDate,
      tags,
      image: series.data.image
    }
  }


}

export const getPostsAndSeries = async (): Promise<PostListItem[]> => {
  const allPosts = await getCollection("blog")
  const standalonePosts = allPosts.filter((p) => p.data.series === undefined)
  const series = await getCollection("series")

  const seriesItems = series.map((s) => {
    return seriesToPostListItem(s, allPosts)
  }).filter((s) => s !== undefined)
  const postItems: PostListItem[] = standalonePosts.map((p) => {
    return {
      ...p
    }
  })

  return [
    ...seriesItems,
    ...postItems
  ]
}



