import { getCollection, z, type CollectionEntry, type DataEntryMap } from "astro:content";
import fs, { Dirent } from "fs"
import path from "path";

type PostFrontmatter = CollectionEntry<"blog">["data"];

export interface PostListItem {
	id: string,
	isSeries: boolean
	posts?: CollectionEntry<"blog">[]
	data: PostFrontmatter
}

export interface SeriesPost extends CollectionEntry<"blog"> {
	index: number
}

export interface SeriesPosts {
	series: CollectionEntry<"series">
	posts: SeriesPost[]
}


const seriesToPostListItem = (seriesPosts: SeriesPosts): PostListItem | undefined => {
	if (seriesPosts.posts.length === 0) {
		return
	}
	const pubDate = seriesPosts.posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())[0]?.data.pubDate
	const updatedDate = seriesPosts.posts.filter((p) => p.data.updatedDate !== undefined).sort((a, b) => {
		return (b.data.updatedDate ?? b.data.pubDate).valueOf() - (a.data.updatedDate ?? b.data.pubDate).valueOf()
	}).filter((d) => d !== undefined)[0]?.data.updatedDate
	const tags = seriesPosts.posts.flatMap((p) => p.data.tags).filter((t) => t !== undefined)
	const uniqueTags = tags.filter((t, i) => {
		return tags.indexOf(t) === i
	})

	return {
		id: seriesPosts.series.id,
		isSeries: true,
		posts: seriesPosts.posts.sort((a, b) => (a.index) - (b.index)),
		data: {
			title: seriesPosts.series.data.name,
			description: seriesPosts.series.data.description,
			pubDate,
			updatedDate,
			tags: uniqueTags,
			image: seriesPosts.series.data.image,
			pinned: seriesPosts.series.data.pinned
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

const resolveCollectionEntry = <T extends keyof DataEntryMap>(collection: CollectionEntry<T>[], candidatePath: string): CollectionEntry<T> | undefined => {
	return collection.find((s) => s.filePath == candidatePath)
}

const getSiblingFiles = async (filePath: string): Promise<Dirent[]> => {
	const siblings = await fs.promises.readdir(path.dirname(filePath), { withFileTypes: true });
	return siblings;
}

const resolvePostIndex = (p: CollectionEntry<"blog">): number | undefined => {
	if (!p.filePath) {
		return
	}
	const basename = path.basename(p.filePath)
	const filename = basename.substring(0, basename.length - path.extname(basename).length)
	const index = parseInt(filename, 10)
	if (isFinite(index)) {
		return index
	}
}

const resolveSeriesPosts = async (series: CollectionEntry<"series">, posts: CollectionEntry<"blog">[]): Promise<SeriesPost[] | undefined> => {
	if (series.filePath === undefined) {
		return
	}

	const siblings = await getSiblingFiles(series.filePath);
	const seriesPosts: SeriesPost[] = []
	siblings.forEach((s) => {
		const p = resolveCollectionEntry<"blog">(posts, path.join(s.parentPath, s.name))
		if (p) {
			const index = resolvePostIndex(p)
			if (index !== undefined) {
				seriesPosts.push({
					...p,
					index
				})
			}
		}
	})

	return seriesPosts
}



export const seperatePosts = async (series: CollectionEntry<"series">[], posts: CollectionEntry<"blog">[]): Promise<{ seriesPostList: SeriesPosts[], standalonePosts: CollectionEntry<"blog">[] }> => {
	const seriesPosts = await Promise.all(series.map(async (s) => {
		const currPosts = await resolveSeriesPosts(s, posts);
		if (currPosts !== undefined) {
			return { series: s, posts: currPosts } satisfies SeriesPosts
		}
	}))

	const seriesPostList = seriesPosts.filter((sp) => sp !== undefined);
	const standalonePosts: CollectionEntry<"blog">[] = posts.filter((p) => {
		const flatSeriesPosts = seriesPostList.flatMap((sp) => sp.posts).map((p) => p as CollectionEntry<"blog">)
		return flatSeriesPosts.find((fsp) => {
			return fsp.id === p.id
		}) === undefined
	})

	return { seriesPostList, standalonePosts }
}

export const getPinned = (posts: PostListItem[]): PostListItem[] => {
	return posts.filter(p => p.data.pinned)
}

export const getPostsAndSeries = async (): Promise<PostListItem[]> => {
	const allPosts = dynamicPostFilter(await getCollection("blog"))
	const series = await getCollection("series")

	const { seriesPostList, standalonePosts } = await seperatePosts(series, allPosts)

	const seriesItems = seriesPostList.map((s) => {
		return seriesToPostListItem(s)
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

export const getSeriesPosts = async (s: CollectionEntry<"series">, posts: CollectionEntry<"blog">[]) => {
	return await resolveSeriesPosts(s, posts)
}

export const getSeriesPostList = async (s: CollectionEntry<"series">, posts: CollectionEntry<"blog">[]): Promise<SeriesPosts> => {
	return {
		series: s,
		posts: await getSeriesPosts(s, posts) ?? []
	}
}



