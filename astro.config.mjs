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

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.emmalexandria.dev',
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { properties: { class: 'heading-link' }, behavior: 'wrap' }]],
  },
  integrations: [mdx(), sitemap(), tailwind(), svelte(), compress({ Image: false }), purgecss(), compressor()]
});
