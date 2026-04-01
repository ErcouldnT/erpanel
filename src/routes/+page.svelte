<script lang='ts'>
  import type { Widget } from '$lib/store'
  import AddWidgetModal from '$lib/components/AddWidgetModal.svelte'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import WidgetCard from '$lib/components/WidgetCard.svelte'
  import { getWidgets, saveWidgets } from '$lib/store'
  import { Plus } from 'lucide-svelte'
  import { onMount } from 'svelte'

  let widgets = $state<Widget[]>([])
  let showModal = $state(false)

  onMount(async () => {
    widgets = await getWidgets()
  })

  async function handleAddWidget(name: string, command: string) {
    const newWidget: Widget = {
      id: crypto.randomUUID(),
      name,
      command,
    }
    widgets = [...widgets, newWidget]
    await saveWidgets(widgets)
  }

  async function handleRemoveWidget(id: string) {
    widgets = widgets.filter(w => w.id !== id)
    await saveWidgets(widgets)
  }
</script>

<div class='mb-8 flex justify-between items-center'>
  <h1 class='text-4xl font-black font-sans tracking-tight bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent'>Custom Dashboard</h1>
  <button
    class='btn btn-primary btn-md shadow-lg shadow-primary/20 hover:scale-105 transition-all'
    onclick={() => showModal = true}
  >
    <Plus size={20} /> Add Widget
  </button>
</div>

{#if widgets.length === 0}
  <EmptyState
    title='No widgets yet'
    description='Create your first dashboard widget by adding a terminal command to easily run tasks at the click of a button.'
  >
    <button class='btn btn-outline' onclick={() => showModal = true}>Create Widget</button>
  </EmptyState>
{:else}
  <div class='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
    {#each widgets as widget (widget.id)}
      <WidgetCard {widget} onRemove={handleRemoveWidget} />
    {/each}
  </div>
{/if}

<AddWidgetModal bind:showModal onAdd={handleAddWidget} />
