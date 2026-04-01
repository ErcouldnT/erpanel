<script lang='ts'>
  import type { Widget } from '$lib/store'
  import SettingsExportCard from '$lib/components/SettingsExportCard.svelte'
  import SettingsImportCard from '$lib/components/SettingsImportCard.svelte'
  import { getWidgets, saveWidgets } from '$lib/store'

  let isExporting = $state(false)
  let isImporting = $state(false)
  let importSuccess = $state(false)
  let importError = $state<string | null>(null)

  let exportSuccess = $state(false)
  let exportError = $state<string | null>(null)

  // Trigger JSON download locally utilizing browser Blob system
  async function exportWidgets() {
    isExporting = true
    exportSuccess = false
    exportError = null

    try {
      const widgets = await getWidgets()
      const exportData = JSON.stringify(widgets, null, 2)

      const blob = new Blob([exportData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `erpanel-dashboard-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      exportSuccess = true
      setTimeout(() => {
        exportSuccess = false
      }, 3000)
    }
    catch (e: any) {
      console.error(e)
      exportError = `Failed to export: ${e.message}`
    }
    isExporting = false
  }

  // Handle selected file upload
  async function importWidgets(event: Event) {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0)
      return

    isImporting = true
    importError = null
    importSuccess = false

    try {
      const file = input.files[0]
      const text = await file.text()

      const parsedData = JSON.parse(text)
      if (!Array.isArray(parsedData)) {
        throw new TypeError('Invalid format: Must be an array of widgets')
      }

      // Basic validation to sanitize the imported JSON
      const safeWidgets: Widget[] = parsedData.map(item => ({
        id: item.id || crypto.randomUUID(),
        name: item.name || 'Unknown Widget',
        command: item.command || '',
      }))

      await saveWidgets(safeWidgets)

      importSuccess = true
      input.value = '' // Reset input to allow re-importing the same file if needed
    }
    catch (e: any) {
      importError = `Failed to import: ${e.message}`
    }
    isImporting = false
  }
</script>

<div class='mb-8 flex justify-between items-center'>
  <h1 class='text-4xl font-black font-sans tracking-tight bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent'>Settings</h1>
</div>

<div class='grid grid-cols-1 lg:grid-cols-2 gap-8'>
  <SettingsExportCard
    {isExporting}
    {exportSuccess}
    {exportError}
    onExport={exportWidgets}
  />
  <SettingsImportCard
    {isImporting}
    {importSuccess}
    {importError}
    onImport={importWidgets}
  />
</div>
