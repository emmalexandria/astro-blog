// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import svelte from '@astrojs/svelte';
import { latte, macchiato } from '@catppuccin/vscode';
import { fromHtml } from 'hast-util-from-html';
import { transformerNotationDiff, transformerMetaHighlight, transformerNotationFocus, transformerMetaWordHighlight, transformerNotationHighlight, transformerRenderWhitespace, transformerNotationWordHighlight } from "@shikijs/transformers"
import icon from "astro-icon"
import { getIconData, iconToHTML, iconToSVG, replaceIDs, type FullExtendedIconifyIcon, type IconifyIconBuildResult } from "@iconify/utils"
import { icons } from "@iconify-json/lucide"
import robotsTxt from 'astro-robots-txt';
import pagefind from 'astro-pagefind';

///Cast, we know this won't be null
const linkIconData = getIconData(icons, 'link') as FullExtendedIconifyIcon
const linkIconRenderData = iconToSVG(linkIconData, {
	height: 'auto'
})
const linkIconHTML = iconToHTML(replaceIDs(linkIconRenderData.body), { ...linkIconRenderData.attributes })

const SITE_ROOT = 'https://blog.emmalexandria.dev'


const AnchorLinkIcon = fromHtml(linkIconHTML)

// https://astro.build/config
export default defineConfig({
	site: SITE_ROOT,
	build: {
		format: "file"
	},
	markdown: {
		rehypePlugins: [rehypeSlug,
			[rehypeAutolinkHeadings,
				{
					behavior: 'append',
					headingProperties: {
						class: 'heading-link'
					},
					content: (heading: any) => [
						AnchorLinkIcon,
					]
				}
			]
		],
		shikiConfig: {
			themes: {
				//@ts-ignore
				light: latte,
				//@ts-ignore
				dark: 'material-theme-darker'
			},
			defaultColor: false,
			transformers: [
				transformerNotationFocus(),
				transformerNotationDiff(),
				transformerNotationHighlight(),
				transformerNotationWordHighlight(),
				transformerMetaHighlight(),
				transformerNotationFocus(),
				transformerRenderWhitespace()
			]
		}
	},
	integrations: [mdx(), sitemap(), robotsTxt(), tailwind(), svelte(), icon(), pagefind()],
	experimental: {
		responsiveImages: true
	}
});
