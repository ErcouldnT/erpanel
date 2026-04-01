<script lang='ts'>
  import Sidebar from '$lib/components/Sidebar.svelte'
  import '../app.css'

  const { children } = $props()
</script>

<div class='h-screen bg-base-100 flex overflow-hidden text-base-content'>
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content -->
  <main class='flex-1 overflow-y-auto relative no-scrollbar bg-base-200/30'>
    <div class='absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-primary/5 to-transparent pointer-events-none'></div>
    <div class='p-8 md:p-12 max-w-7xl mx-auto min-h-full relative'>
      {@render children()}
    </div>
  </main>
</div>
