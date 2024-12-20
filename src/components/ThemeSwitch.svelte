<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { setThemeActive, themes } from "../themes";
  import { fade, fly } from "svelte/transition";

  interface Props {
    themeName: string;
    inactiveIcon: Snippet;
    activeIcon: Snippet;
    title?: string;
  }

  let activeWrapper: HTMLSpanElement;
  let inactiveWrapper: HTMLSpanElement;

  let {
    themeName,
    inactiveIcon,
    activeIcon,
    title = "Theme toggle",
  }: Props = $props();
  const theme = themes.find((v) => v.get().name === themeName)!;
  const id = `theme-switcher-${$theme.name}`;
</script>

<label
  {id}
  {title}
  class="text-2xl text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 cursor-pointer"
>
  <button
    onclick={() => {
      setThemeActive(theme, !$theme.active);
    }}
    id="themeSwitcher"
    aria-labelledby={id}
    name="themeSwitcher"
    class="hidden"
  ></button>
  <div class="grid-stack">
    {#if $theme.active}
      <span
        in:fade={{ duration: 100, delay: 100 }}
        out:fade={{ duration: 100 }}
        bind:this={activeWrapper}
        class="grid-stack-item"
      >
        {@render activeIcon()}
      </span>
    {:else}
      <span
        in:fade={{ duration: 100, delay: 100 }}
        out:fade={{ duration: 100 }}
        bind:this={inactiveWrapper}
        class="grid-stack-item"
      >
        {@render inactiveIcon()}
      </span>
    {/if}
  </div>
</label>

<style>
  .grid-stack {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .grid-stack-item {
    grid-area: 1 / 1 / 1 / 1;
  }
</style>
