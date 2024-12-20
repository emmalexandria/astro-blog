<script lang="ts">
  import Banner from "./Banner.svelte";
  import { isSharedBannerOpen, sharedBannerContent } from "../lib/stores";
  interface Props {
    id: string;
  }
  const { id }: Props = $props();
</script>

<Banner {id} bind:visible={$isSharedBannerOpen}>
  {$sharedBannerContent}
</Banner>
