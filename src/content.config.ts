import { glob } from 'astro/loaders';

import { defineCollection, reference, z } from 'astro:content';



const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }).optional()

  }),
});

const series = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }).optional()
  })
})

export const collections = { blog, series };
