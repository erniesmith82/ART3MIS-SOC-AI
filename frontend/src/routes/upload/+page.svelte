<script>
	import { onMount } from 'svelte';

	import { analyzeText, uploadLogFile } from '$lib/api/client';
	import { requireAuth } from '$lib/auth';

	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import SeverityBadge from '$lib/components/SeverityBadge.svelte';
	import AiSummary from '$lib/components/AiSummary.svelte';
	import LoadingOverlay from '$lib/components/LoadingOverlay.svelte';

	let logText = '';
	let selectedFile = null;
	let result = null;
	let error = '';
	let loading = false;

	onMount(() => {
		requireAuth();
	});

	async function handleAnalyzeText() {
		error = '';
		result = null;
		loading = true;

		try {
			result = await analyzeText(logText);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	async function handleFileUpload() {
		error = '';
		result = null;

		if (!selectedFile) {
			error = 'Choose a log file first.';
			return;
		}

		loading = true;

		try {
			result = await uploadLogFile(selectedFile);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	function handleFileChange(event) {
		selectedFile = event.target.files?.[0] ?? null;
	}
</script>

<div class="flex min-h-screen bg-slate-950 text-slate-100">
	<LoadingOverlay
		show={loading}
		title="Deploying synaptic overdrive..."
		message="ART3MIS is analyzing logs, scoring threats, and generating the incident summary."
	/>

	<AppSidebar />

	<main class="flex-1 px-6 py-10">
		<div class="mx-auto max-w-7xl">
			<div>
				<div
					class="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300"
				>
					ART3MIS SOC AI
				</div>

				<h1 class="mt-6 text-5xl font-black tracking-tight">
					Security Log Analyzer
				</h1>

				<p class="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
					Paste raw logs or upload a security log file. ART3MIS SOC AI will
					detect suspicious activity, assign threat severity, and generate an
					AI-assisted incident summary.
				</p>
			</div>

			<section class="mt-10 grid gap-8 lg:grid-cols-2">
				<div
					class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl"
				>
					<h2 class="text-2xl font-black">Paste Log Text</h2>

					<textarea
						bind:value={logText}
						class="mt-6 min-h-[400px] w-full rounded-3xl border border-slate-700 bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none transition focus:border-emerald-400"
						placeholder="Paste logs here..."
					></textarea>

					<button
						on:click={handleAnalyzeText}
						disabled={loading}
						class="mt-6 rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? 'Analyzing...' : 'Analyze Text'}
					</button>
				</div>

				<div class="space-y-8">
					<div
						class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl"
					>
						<h2 class="text-2xl font-black">Upload Log File</h2>

						<div
							class="mt-6 rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center"
						>
							<input
								type="file"
								accept=".txt,.log,.csv"
								on:change={handleFileChange}
								class="mx-auto block text-sm text-slate-300"
							/>

							<p class="mt-4 text-sm text-slate-500">
								Supported formats: .txt .log .csv
							</p>
						</div>

						<button
							on:click={handleFileUpload}
							disabled={loading}
							class="mt-6 rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{loading ? 'Analyzing...' : 'Upload + Analyze'}
						</button>
					</div>

					<div
						class="rounded-[2rem] border border-emerald-400/20 bg-slate-900/70 p-6 shadow-xl"
					>
						<p
							class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300"
						>
							Test Data
						</p>

						<p class="mt-3 text-sm leading-7 text-slate-400">
							Test file included:
						</p>

						<div
							class="mt-4 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-emerald-300"
						>
							backend/sample_logs/sample_auth.log
						</div>
					</div>
				</div>
			</section>

			{#if error}
				<div
					class="mt-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-300"
				>
					{error}
				</div>
			{/if}

			{#if result}
				<section class="mt-12 space-y-8">
					<div class="grid gap-4 md:grid-cols-5">
						<div class="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
							<p class="text-sm text-slate-400">Total Lines</p>

							<p class="mt-3 text-4xl font-black">
								{result.total_lines}
							</p>
						</div>

						<div class="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
							<p class="text-sm text-slate-400">Suspicious</p>

							<p class="mt-3 text-4xl font-black">
								{result.suspicious_count}
							</p>
						</div>

						<div
							class="rounded-3xl border border-red-500/20 bg-red-500/5 p-6"
						>
							<p class="text-sm text-red-300">Critical</p>

							<p class="mt-3 text-4xl font-black text-red-300">
								{result.critical_count}
							</p>
						</div>

						<div
							class="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6"
						>
							<p class="text-sm text-orange-300">High</p>

							<p class="mt-3 text-4xl font-black text-orange-300">
								{result.high_count}
							</p>
						</div>

						<div
							class="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6"
						>
							<p class="text-sm text-yellow-300">Medium / Low</p>

							<p class="mt-3 text-4xl font-black text-yellow-300">
								{result.medium_count}/{result.low_count}
							</p>
						</div>
					</div>

					<div
						class="rounded-[2rem] border border-emerald-400/20 bg-slate-900/70 p-8 shadow-2xl"
					>
						<p
							class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300"
						>
							AI Incident Summary
						</p>

						<div class="mt-5 text-lg text-slate-300">
							<AiSummary text={result.ai_summary} />
						</div>
					</div>

					<div
						class="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70 shadow-2xl"
					>
						<div class="border-b border-slate-800 px-6 py-5">
							<h2 class="text-2xl font-black">
								Detected Security Events
							</h2>
						</div>

						<div class="overflow-x-auto">
							<table class="w-full border-collapse">
								<thead class="bg-slate-950">
									<tr
										class="text-left text-sm uppercase tracking-[0.2em] text-slate-500"
									>
										<th class="px-6 py-4">Line</th>
										<th class="px-6 py-4">Severity</th>
										<th class="px-6 py-4">Type</th>
										<th class="px-6 py-4">Source IP</th>
										<th class="px-6 py-4">Message</th>
									</tr>
								</thead>

								<tbody>
									{#each result.events as event}
										<tr class="border-t border-slate-800">
											<td
												class="px-6 py-5 font-mono text-sm text-slate-400"
											>
												{event.line_number}
											</td>

											<td class="px-6 py-5">
												<SeverityBadge severity={event.severity} />
											</td>

											<td class="px-6 py-5 text-sm font-bold">
												{event.event_type}
											</td>

											<td
												class="px-6 py-5 font-mono text-sm text-emerald-300"
											>
												{event.source_ip ?? 'N/A'}
											</td>

											<td
												class="max-w-xl px-6 py-5 font-mono text-sm leading-6 text-slate-300"
											>
												{event.message}
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			{/if}
		</div>
	</main>
</div>