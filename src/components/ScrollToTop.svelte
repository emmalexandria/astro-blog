<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { fade } from "svelte/transition";

  interface Props {
    children: Snippet;
  }

  const { children }: Props = $props();

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let shown = $state(false);

  const handleScroll = () => {
    const root = document.documentElement;
    const scrollMax = root.scrollHeight - root.clientHeight;

    if (root.scrollTop / scrollMax > 0.15) {
      shown = true;
    } else {
      shown = false;
    }
  };

  onMount(() => {
    handleScroll();
    document.addEventListener("scroll", handleScroll);
  });
</script>

{#if shown}
  <button
    transition:fade={{ duration: 200 }}
    class="fixed bottom-4 right-4 z-50"
    onclick={scrollToTop}
  >
    {@render children()}
  </button>
{/if}
