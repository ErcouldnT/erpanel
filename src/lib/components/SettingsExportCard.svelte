<script lang='ts'>
  import { Download, Info } from 'lucide-svelte'

  const { isExporting, exportSuccess, exportError, onExport } = $props<{
    isExporting: boolean
    exportSuccess: boolean
    exportError: string | null
    onExport: () => void
  }>()
</script>

<div class='card bg-base-200 border border-base-content/10'>
  <div class='card-body'>
    <div class='flex items-center gap-3 mb-2'>
      <div class='p-3 bg-primary/10 rounded-xl text-primary'>
        <Download size={24} />
      </div>
      <div>
        <h2 class='card-title text-xl font-bold'>Export Dashboard</h2>
        <p class='text-sm opacity-70'>Save your widgets to share with others</p>
      </div>
    </div>

    <div class='flex flex-col gap-4 mt-4'>
      {#if exportError}
        <div class='alert alert-error shadow-sm bg-error/10 text-error border-error/20 py-2 transition-all'>
          <span class='text-sm'>{exportError}</span>
        </div>
      {:else if exportSuccess}
        <div class='alert alert-success shadow-sm bg-success/10 text-success border-success/20 py-2 transition-all'>
          <span class='text-sm'>Successfully exported to your Downloads folder!</span>
        </div>
      {:else}
        <div class='alert alert-info shadow-sm bg-info/10 text-info border-info/20 py-2 transition-all'>
          <Info size={18} />
          <span class='text-sm'>This will convert all your custom terminal commands into a single standard JSON file.</span>
        </div>
      {/if}
      <button
        class='btn btn-primary w-full shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]'
        onclick={onExport}
        disabled={isExporting}
      >
        {#if isExporting}
          <span class='loading loading-spinner w-4'></span> Exporting...
        {:else}
          Export JSON
        {/if}
      </button>
    </div>
  </div>
</div>
