export interface Heading {
  depth: number,
  slug: string,
  text: string
}

export interface HeadingLevel {
  heading: Heading,
  subheadings: HeadingLevel[]
}

export function nestHeadings(headings: Heading[]): HeadingLevel[] {
  const toc: HeadingLevel[] = [];

  const stack: { level: number; children: HeadingLevel[] }[] = [
    { level: 0, children: toc },
  ];

  for (const heading of headings) {
    if (heading.depth > 4) {
      continue
    }
    const currentLevel: HeadingLevel = { heading, subheadings: [] };

    // Pop the stack until we find the appropriate parent level
    while (stack.length > 1 && heading.depth <= stack[stack.length - 1].level) {
      stack.pop();
    }

    // Add the current heading to its parent's subheadings
    stack[stack.length - 1].children.push(currentLevel);

    // Push the current level onto the stack
    stack.push({ level: heading.depth, children: currentLevel.subheadings });
  }

  return toc;
}
