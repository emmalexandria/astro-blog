<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { themes, initTheme } from "../themes";

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();
</script>

<div
  class="flex flex-row gap-2 border border-mono-400 dark:border-mono-600 high-contrast:border-mono-900 dark:high-contrast:border-mono-100 px-2 py-1 rounded-md"
>
  {@render children()}
</div>
