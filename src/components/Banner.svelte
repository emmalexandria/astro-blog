<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  interface Props {
    id: string;
    icon?: Snippet;
    children: Snippet;
    visible?: boolean;
  }

  let { id, icon, children, visible = $bindable() }: Props = $props();

  $effect(() => {
    if (visible) {
      setTimeout(() => {
        visible = false;
      }, 1500);
    }
  });
</script>

<!-- @render doesn't seem to work with Astro's named slots. Gotta use deprecated Svelte for now -->
{#if visible}
  <div {id} class={`fixed bottom-10 left-0 w-full px-8`}>
    <div
      in:fade={{ duration: 100 }}
      out:fade={{ duration: 300 }}
      class="flex mx-auto w-fit gap-4 items-center flex-row bg-mono-50 dark:bg-mono-950 rounded-md border border-mono-200 dark:border-mono-800 p-2 items-center"
    >
      <p class="flex w-fit items-center font-bold text-sm">
        {@render children()}
      </p>
      {#if icon}
        <button
          class="text-mono-200 dark:text-mono-600 hover:bg-primary-700 rounded-sm p-1"
          onclick={() => {
            visible = false;
          }}
        >
          {@render icon()}
        </button>
      {/if}
    </div>
  </div>
{/if}
