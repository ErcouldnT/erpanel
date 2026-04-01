import { Store } from '@tauri-apps/plugin-store'

export interface Widget {
  id: string
  name: string
  command: string
}

async function getStore() {
  return await Store.load('dashboard.dat')
}

export async function getWidgets(): Promise<Widget[]> {
  const store = await getStore()
  const widgets = await store.get<Widget[]>('widgets')
  return widgets || []
}

export async function saveWidgets(widgets: Widget[]): Promise<void> {
  const store = await getStore()
  await store.set('widgets', widgets)
  await store.save()
}
