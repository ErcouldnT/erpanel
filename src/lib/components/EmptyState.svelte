<script lang='ts'>
  import type { Snippet } from 'svelte'

  const { title, description, children } = $props<{
    title: string
    description: string
    children?: Snippet
  }>()
</script>

<div class='hero rounded-2xl bg-base-200 py-16 border border-base-content/5'>
  <div class='hero-content text-center'>
    <div class='max-w-md flex flex-col items-center'>
      <h2 class='text-2xl font-bold mb-4'>{title}</h2>
      <p class='opacity-70 mb-6'>{description}</p>
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>
