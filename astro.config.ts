// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

import svelte from '@astrojs/svelte';

import compress from 'astro-compress';
import purgecss from 'astro-purgecss';
import compressor from 'astro-compressor';

import { latte, macchiato } from '@catppuccin/vscode';

import { h } from 'hastscript'
import { fromHtml } from 'hast-util-from-html';

import { transformerNotationDiff, transformerMetaHighlight, transformerNotationFocus } from "@shikijs/transformers"

import icon from "astro-icon"



import { getIconData, iconToHTML, iconToSVG, replaceIDs, type FullExtendedIconifyIcon, type IconifyIconBuildResult } from "@iconify/utils"
import { icons } from "@iconify-json/lucide"
import { HEADER_LINK_CLASSES } from './src/consts';


///Cast, we know this won't be null
const linkIconData = getIconData(icons, 'link') as FullExtendedIconifyIcon
const linkIconRenderData = iconToSVG(linkIconData, {
  height: 'auto'
})
const linkIconHTML = iconToHTML(replaceIDs(linkIconRenderData.body), { ...linkIconRenderData.attributes, class: HEADER_LINK_CLASSES.iconSVG })



const AnchorLinkIcon = fromHtml(linkIconHTML)

// https://astro.build/config
export default defineConfig({
  site: 'https://emmalexandria.dev',
  markdown: {
    rehypePlugins: [rehypeSlug,
      [rehypeAutolinkHeadings,
        {
          properties: {
            class: HEADER_LINK_CLASSES.anchor
          },
          behavior: 'append',
          headingProperties: {
            class: HEADER_LINK_CLASSES.heading
          },
          content: (heading: any) => [
            AnchorLinkIcon,
            h(
              `p.${HEADER_LINK_CLASSES.hoverCopyText}`,
              'Click to copy'
            )
          ]
        }
      ]
    ],
    shikiConfig: {
      themes: {
        //@ts-ignore
        light: latte,
        //@ts-ignore
        dark: macchiato
      },
      transformers: [
        transformerNotationFocus(),
        transformerNotationDiff(),
        transformerMetaHighlight()
      ]
    }
  },
  integrations: [mdx(), sitemap(), tailwind(), svelte(), compress({ Image: false }), purgecss(), compressor(), icon()],
  experimental: {
    responsiveImages: true
  }
});
