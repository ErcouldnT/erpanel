<script lang='ts'>
  const { parsedCron } = $props<{
    parsedCron: { schedule: string, command: string, raw: string }[]
  }>()
</script>

<div class='overflow-x-auto rounded-xl border border-base-content/10 bg-base-100 shadow-xl'>
  <table class='table table-zebra w-full'>
    <thead class='bg-base-200/50 text-base-content/70'>
      <tr>
        <th class='w-1/4 font-mono text-sm tracking-wider'>SCHEDULE</th>
        <th class='font-mono text-sm tracking-wider'>COMMAND</th>
      </tr>
    </thead>
    <tbody>
      {#each parsedCron as job}
        <tr class='hover'>
          <td class='font-mono text-primary font-semibold whitespace-nowrap bg-primary/5'>{job.schedule}</td>
          <td class='font-mono text-sm break-all'><code>{job.command}</code></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
