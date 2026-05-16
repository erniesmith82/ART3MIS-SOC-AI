<script>
  export let severity = 'Low';

  $: classes = {
    Critical: 'bg-red-500/15 text-red-300 ring-red-500/40',
    High: 'bg-orange-500/15 text-orange-300 ring-orange-500/40',
    Medium: 'bg-yellow-500/15 text-yellow-300 ring-yellow-500/40',
    Low: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/40'
  }[severity] ?? 'bg-slate-500/15 text-slate-300 ring-slate-500/40';
</script>

<span class={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${classes}`}>
  {severity}
</span>
