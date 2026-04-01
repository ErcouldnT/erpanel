<script lang='ts'>
  import { Info, Upload } from 'lucide-svelte'

  const { isImporting, importSuccess, importError, onImport } = $props<{
    isImporting: boolean
    importSuccess: boolean
    importError: string | null
    onImport: (event: Event) => void
  }>()
</script>

<div class='card bg-base-200 border border-base-content/10'>
  <div class='card-body'>
    <div class='flex items-center gap-3 mb-2'>
      <div class='p-3 bg-secondary/10 rounded-xl text-secondary'>
        <Upload size={24} />
      </div>
      <div>
        <h2 class='card-title text-xl font-bold'>Import Dashboard</h2>
        <p class='text-sm opacity-70'>Load a dashboard configuration</p>
      </div>
    </div>

    <div class='flex flex-col gap-4 mt-4'>
      {#if importError}
        <div class='alert alert-error shadow-sm bg-error/10 text-error border-error/20 py-2'>
          <span class='text-sm'>{importError}</span>
        </div>
      {:else if importSuccess}
        <div class='alert alert-success shadow-sm bg-success/10 text-success border-success/20 py-2'>
          <span class='text-sm'>Successfully imported! Check your Dashboard.</span>
        </div>
      {:else}
        <div class='alert alert-warning shadow-sm bg-warning/10 text-warning border-warning/20 py-2'>
          <Info size={18} />
          <span class='text-sm'>Warning: Importing will overwrite your current widgets.</span>
        </div>
      {/if}

      <label class='btn btn-secondary w-full shadow-lg shadow-secondary/20 transition-all hover:scale-[1.02] cursor-pointer'>
        {#if isImporting}
          <span class='loading loading-spinner w-4'></span> Importing...
        {:else}
          Select JSON File
        {/if}
        <input
          type='file'
          accept='.json,application/json'
          class='hidden'
          onchange={onImport}
          disabled={isImporting}
        />
      </label>
    </div>
  </div>
</div>
