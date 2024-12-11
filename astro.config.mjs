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

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://emmalexandria.dev',
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { properties: { class: 'heading-link' }, behavior: 'wrap' }]],
    shikiConfig: {
      themes: {
        //@ts-ignore
        light: latte,
        //@ts-ignore
        dark: macchiato
      }
    }
  },
  integrations: [mdx(), sitemap(), tailwind(), svelte(), compress({ Image: false }), purgecss(), compressor(), icon()],
  experimental: {
    responsiveImages: true
  }
});
