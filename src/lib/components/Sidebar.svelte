<script lang='ts'>
  import { page } from '$app/stores'
  import { CalendarClock, Settings, Terminal } from 'lucide-svelte'
</script>

<aside class='w-64 bg-base-300 border-r border-base-content/10 flex flex-col pt-6 pb-4 px-4 shadow-xl shrink-0'>
  <div class='flex items-center gap-3 px-2 mb-8'>
    <div class='bg-linear-to-br from-primary to-secondary p-2 rounded-xl shadow-lg shadow-primary/20'>
      <Terminal size={24} class='text-primary-content' />
    </div>
    <div>
      <h2 class='font-extrabold text-xl tracking-tight leading-none bg-linear-to-r from-base-content to-base-content/60 bg-clip-text text-transparent'>ERPanel</h2>
      <span class='text-[11px] font-bold text-base-content/50 uppercase tracking-widest mt-0.5 block'>Automate OS</span>
    </div>
  </div>

  <nav class='flex-1 space-y-2'>
    <a href='/' class="btn btn-ghost w-full justify-start font-medium text-base group transition-all {$page.url.pathname === '/' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'hover:bg-base-200'}">
      <Terminal size={18} class="mr-2 transition-colors {$page.url.pathname === '/' ? 'text-primary' : 'text-base-content/50 group-hover:text-base-content/80'}" />
      Dashboard
    </a>

    <a href='/cron' class="btn btn-ghost w-full justify-start font-medium text-base group transition-all {$page.url.pathname === '/cron' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'hover:bg-base-200'}">
      <CalendarClock size={18} class="mr-2 transition-colors {$page.url.pathname === '/cron' ? 'text-primary' : 'text-base-content/50 group-hover:text-base-content/80'}" />
      Cron Tasks
    </a>

    <a href='/settings' class="btn btn-ghost w-full justify-start font-medium text-base group transition-all {$page.url.pathname === '/settings' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'hover:bg-base-200'}">
      <Settings size={18} class="mr-2 transition-colors {$page.url.pathname === '/settings' ? 'text-primary' : 'text-base-content/50 group-hover:text-base-content/80'}" />
      Settings
    </a>
  </nav>

  <div class='mt-auto pt-6 border-t border-base-content/10 px-2 text-center'>
    <p class='text-[10px] text-base-content/40 font-bold uppercase tracking-widest'>Built with Tauri</p>
  </div>
</aside>
