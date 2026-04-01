<script lang='ts'>
  import CronTable from '$lib/components/CronTable.svelte'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import { Command } from '@tauri-apps/plugin-shell'
  import { AlertCircle, CalendarClock, RefreshCw } from 'lucide-svelte'
  import { onMount } from 'svelte'

  let parsedCron = $state<{ schedule: string, command: string, raw: string }[]>([])
  let rawCron = $state('')
  let loading = $state(true)
  let errorMsg = $state('')

  onMount(() => {
    loadCron()
  })

  async function loadCron() {
    loading = true
    errorMsg = ''
    rawCron = ''
    parsedCron = []

    try {
      const result = await Command.create('bash', ['-c', 'crontab -l']).execute()

      if (result.code !== 0) {
        if (result.stderr.includes('no crontab for')) {
          errorMsg = 'No crontab found for current user.'
        }
        else {
          errorMsg = result.stderr || 'Unknown error occurred while reading crontab.'
        }
        loading = false
        return
      }

      rawCron = result.stdout
      parseCron(rawCron)
    }
    catch (e: any) {
      errorMsg = e.toString()
    }
    finally {
      loading = false
    }
  }

  const SPACE_REGEX = /\s+/

  function parseCron(cronTxt: string) {
    const lines = cronTxt.split('\n')
    const jobs = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#'))
        continue

      // Basic cron parsing: first 5 tokens are schedule, rest is command.
      // E.g. */5 * * * * /path/to/script.sh
      const parts = trimmed.split(SPACE_REGEX)
      if (parts.length >= 6) {
        const schedule = parts.slice(0, 5).join(' ')
        const command = parts.slice(5).join(' ')
        jobs.push({ schedule, command, raw: trimmed })
      }
      else {
        // Fallback for weird lines
        jobs.push({ schedule: 'Special', command: trimmed, raw: trimmed })
      }
    }

    parsedCron = jobs
  }
</script>

<div class='mb-8 flex justify-between items-center'>
  <div class='flex items-center gap-3'>
    <div class='p-2 bg-primary/20 text-primary rounded-lg'>
      <CalendarClock size={28} />
    </div>
    <h1 class='text-4xl font-black font-sans tracking-tight'>System Cron Jobs</h1>
  </div>

  <button
    class='btn btn-outline gap-2 shadow-sm'
    onclick={loadCron}
    disabled={loading}
  >
    <RefreshCw size={18} class={loading ? 'animate-spin' : ''} /> Refresh
  </button>
</div>

{#if loading}
  <div class='flex justify-center items-center py-20'>
    <span class='loading loading-spinner loading-lg text-primary'></span>
  </div>
{:else if errorMsg}
  <div class='alert alert-warning shadow-lg max-w-2xl mx-auto rounded-xl'>
    <AlertCircle size={24} />
    <div>
      <h3 class='font-bold'>Notice</h3>
      <div class='text-sm'>{errorMsg}</div>
    </div>
  </div>
{:else if parsedCron.length === 0}
  <EmptyState
    title='No Active Tasks'
    description='There are currently no scheduled cron jobs configured for your user profile in MacOS.'
  />
{:else}
  <CronTable {parsedCron} />

  <div class='mt-8 collapse collapse-arrow border border-base-300 bg-base-200 rounded-xl'>
    <input type='checkbox' />
    <div class='collapse-title text-lg font-medium'>
      View Raw Crontab File
    </div>
    <div class='collapse-content'>
      <pre class='bg-black text-neutral-content p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed mt-2'>{rawCron}</pre>
    </div>
  </div>
{/if}
