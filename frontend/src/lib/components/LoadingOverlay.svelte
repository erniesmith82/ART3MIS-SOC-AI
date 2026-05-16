<script>
	export let show = false;
	export let title = 'Deploying synaptic overdrive...';
	export let message = 'ART3MIS is processing intelligence.';
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-6 backdrop-blur-md">
		<div class="w-full max-w-md rounded-[2rem] border border-emerald-400/20 bg-slate-900/95 p-8 text-center shadow-2xl shadow-emerald-500/10">
			<div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
				<div class="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-300"></div>
			</div>

			<p class="mt-8 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">
				ART3MIS SOC AI
			</p>

			<h2 class="mt-4 text-2xl font-black text-slate-100">
				{title}
			</h2>

			<p class="mt-4 leading-7 text-slate-400">
				{message}
			</p>

			<div class="mt-8 space-y-3 text-left font-mono text-xs text-slate-500">
				<div class="rounded-xl bg-slate-950 p-3">
					<span class="text-emerald-300">status:</span> analyzing_signal
				</div>

				<div class="rounded-xl bg-slate-950 p-3">
					<span class="text-cyan-300">engine:</span> local_ollama_llm
				</div>

				<div class="rounded-xl bg-slate-950 p-3">
					<span class="text-orange-300">mode:</span> incident_triage
				</div>
			</div>
		</div>
	</div>
{/if}