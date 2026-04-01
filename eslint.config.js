import antfu from '@antfu/eslint-config'

export default antfu({
  svelte: true,
  typescript: true,
  formatters: true,
  ignores: ['src-tauri/**'],
})
