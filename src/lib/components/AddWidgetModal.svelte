<script lang='ts'>
  let { showModal = $bindable(false), onAdd } = $props<{
    showModal: boolean
    onAdd: (name: string, command: string) => void
  }>()

  let newName = $state('')
  let newCommand = $state('')

  function handleSubmit() {
    if (!newName || !newCommand)
      return
    onAdd(newName, newCommand)
    newName = ''
    newCommand = ''
    showModal = false
  }
</script>

{#if showModal}
  <dialog class='modal modal-open bg-black/40 backdrop-blur-sm'>
    <div class='modal-box w-11/12 max-w-lg'>
      <h3 class='font-bold text-xl mb-6'>Create New Widget</h3>

      <div class='form-control w-full mb-4'>
        <label class='label' for='widget-name'><span class='label-text font-medium'>Widget Name</span></label>
        <input
          id='widget-name'
          type='text'
          placeholder='e.g., Update System'
          class='input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors'
          bind:value={newName}
        />
      </div>

      <div class='form-control w-full mb-8'>
        <label class='label' for='widget-command'>
          <span class='label-text font-medium'>Terminal Command</span>
          <span class='label-text-alt text-base-content/50'>Runs in bash session</span>
        </label>
        <textarea
          id='widget-command'
          placeholder='e.g., brew update && brew upgrade'
          class='textarea textarea-bordered w-full font-mono text-sm leading-relaxed bg-base-200 focus:bg-base-100 transition-colors'
          bind:value={newCommand}
          rows='4'
        ></textarea>
      </div>

      <div class='modal-action'>
        <button class='btn btn-ghost' onclick={() => showModal = false}>Cancel</button>
        <button class='btn btn-primary min-w-[120px]' onclick={handleSubmit} disabled={!newName || !newCommand}>Save Widget</button>
      </div>
    </div>
  </dialog>
{/if}
