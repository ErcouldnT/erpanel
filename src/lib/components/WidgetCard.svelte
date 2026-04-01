<script lang='ts'>
  import type { Widget } from '$lib/store'
  import { Command } from '@tauri-apps/plugin-shell'
  import { Play, Square, Trash } from 'lucide-svelte'

  const { widget, onRemove } = $props<{
    widget: Widget
    onRemove: (id: string) => void
  }>()

  let log = $state<string>('')
  let isRunning = $state(false)
  let activeProcess = $state<any>(null)

  async function stopCommand() {
    if (activeProcess) {
      try {
        await activeProcess.kill()
        log += `\n[Process terminated by user]`
      }
      catch (e) {
        log += `\n[Failed to kill process: ${e}]`
      }
      isRunning = false
      activeProcess = null
    }
  }

  async function runCommand() {
    if (isRunning)
      return

    log = `> ${widget.command}\n`
    isRunning = true

    try {
      const cmd = Command.create('bash', ['-c', widget.command])

      cmd.on('close', (data: any) => {
        if (isRunning) {
          log += `\n[Process Finished with code ${data.code}]`
          isRunning = false
          activeProcess = null
        }
      })
      cmd.on('error', (error: any) => {
        if (isRunning) {
          log += `\n[Error: ${error}]`
          isRunning = false
          activeProcess = null
        }
      })
      cmd.stdout.on('data', (line: string) => {
        log += `${line}\n`
      })
      cmd.stderr.on('data', (line: string) => {
        log += `${line}\n`
      })

      activeProcess = await cmd.spawn()
    }
    catch (e) {
      log += `\n[Failed to execute: ${e}]`
      isRunning = false
      activeProcess = null
    }
  }
</script>

<div class='card bg-base-200 shadow-xl border border-base-content/10 flex flex-col h-96 group transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30'>
  <div class='card-body p-5 flex flex-col h-full'>
    <div class='flex justify-between items-start mb-2 gap-4'>
      <h2 class='card-title text-lg font-bold truncate flex-1'>{widget.name}</h2>
      <button
        class='btn btn-ghost btn-sm btn-circle text-error opacity-0 group-hover:opacity-100 transition-opacity'
        onclick={() => onRemove(widget.id)}
        disabled={isRunning}
      >
        <Trash size={16} />
      </button>
    </div>

    <code class='text-xs text-base-content/60 bg-base-300 p-2.5 rounded border border-base-300 truncate break-all block mb-4 font-mono shadow-inner select-all'>
      {widget.command}
    </code>

    <div class='flex-1 bg-black rounded-xl p-4 overflow-y-auto font-mono text-xs text-green-400 shadow-inner break-all whitespace-pre-wrap flex flex-col justify-end'>
      {#if log}
        <div class='pb-1'>{log}</div>
      {:else}
        <span class='text-green-500/30 italic'>Output will stream here...</span>
      {/if}
    </div>

    <div class='card-actions justify-end mt-4'>
      {#if isRunning}
        <button
          class='btn btn-sm w-full transition-all active:scale-95 group btn-ghost bg-base-300 hover:bg-error/20 hover:text-error hover:border-error/50 border border-transparent'
          onclick={stopCommand}
        >
          <div class='flex items-center justify-center gap-2 group-hover:hidden text-primary'>
            <span class='loading loading-spinner w-4'></span> Running...
          </div>
          <div class='hidden items-center justify-center gap-2 group-hover:flex'>
            <Square size={14} class='fill-current' /> Stop Process
          </div>
        </button>
      {:else}
        <button
          class='btn btn-primary btn-sm w-full gap-2 shadow-md shadow-primary/20 transition-all active:scale-95'
          onclick={runCommand}
        >
          <Play size={16} /> Execute
        </button>
      {/if}
    </div>
  </div>
</div>
