<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { getReport } from '$lib/api/client';
	import { requireAuth } from '$lib/auth';

	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import SeverityBadge from '$lib/components/SeverityBadge.svelte';
	import AiSummary from '$lib/components/AiSummary.svelte';

	let report = null;
	let loading = true;
	let error = '';

	$: reportId = $page.params.id;

	$: criticalEvents =
		report?.events?.filter((event) => event.severity === 'Critical') ?? [];

	$: highEvents =
		report?.events?.filter((event) => event.severity === 'High') ?? [];

	onMount(async () => {
		requireAuth();

		try {
			report = await getReport(reportId);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});

	function printReport() {
		window.print();
	}
</script>

<svelte:head>
	<title>Incident Report #{reportId} | ART3MIS SOC AI</title>
</svelte:head>

<div class="flex min-h-screen bg-slate-950 text-slate-100 print:block print:bg-white print:text-black">
	<div class="print:hidden">
		<AppSidebar />
	</div>

	<main class="flex-1 px-6 py-10 print:p-0">
		<div class="mx-auto max-w-7xl print:max-w-none">
			<div class="no-print flex items-center justify-between gap-4">
				<a
					href="/dashboard"
					class="text-sm font-bold text-emerald-300 hover:text-emerald-200"
				>
					← Back to Dashboard
				</a>

				<button
					on:click={printReport}
					class="rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-300"
				>
					Print / Save PDF
				</button>
			</div>

			<div class="mt-8 print:mt-0 print:border-b print:border-black print:pb-4">
				<div
					class="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 print:border-black print:bg-white print:text-black"
				>
					ART3MIS SOC AI
				</div>

				<h1 class="mt-6 text-5xl font-black tracking-tight print:text-3xl">
					Incident Investigation Report
				</h1>

				<p class="mt-4 max-w-3xl text-lg leading-8 text-slate-300 print:text-black">
					Saved cybersecurity log analysis with event detection, severity scoring,
					incident summary, and response recommendations.
				</p>
			</div>

			{#if loading}
				<div
					class="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center"
				>
					Loading report...
				</div>
			{:else if error}
				<div
					class="mt-10 rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-300"
				>
					{error}
				</div>
			{:else if report}
				<section class="mt-10 grid gap-4 md:grid-cols-5 print:grid-cols-5">
					<div
						class="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 print:border-black print:bg-white print:p-3"
					>
						<p class="text-sm text-slate-400 print:text-black">Report ID</p>

						<p class="mt-3 text-4xl font-black print:text-xl">
							#{report.id}
						</p>
					</div>

					<div
						class="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 print:border-black print:bg-white print:p-3"
					>
						<p class="text-sm text-slate-400 print:text-black">Total Lines</p>

						<p class="mt-3 text-4xl font-black print:text-xl">
							{report.total_lines}
						</p>
					</div>

					<div
						class="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 print:border-black print:bg-white print:p-3"
					>
						<p class="text-sm text-slate-400 print:text-black">Suspicious</p>

						<p
							class="mt-3 text-4xl font-black text-emerald-300 print:text-xl print:text-black"
						>
							{report.suspicious_count}
						</p>
					</div>

					<div
						class="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 print:border-black print:bg-white print:p-3"
					>
						<p class="text-sm text-red-300 print:text-black">Critical</p>

						<p
							class="mt-3 text-4xl font-black text-red-300 print:text-xl print:text-black"
						>
							{report.critical_count}
						</p>
					</div>

					<div
						class="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6 print:border-black print:bg-white print:p-3"
					>
						<p class="text-sm text-orange-300 print:text-black">High</p>

						<p
							class="mt-3 text-4xl font-black text-orange-300 print:text-xl print:text-black"
						>
							{report.high_count}
						</p>
					</div>
				</section>

				<section class="mt-8 grid gap-8 lg:grid-cols-3 print:grid-cols-1">
					<div
						class="rounded-[2rem] border border-emerald-400/20 bg-slate-900/70 p-8 shadow-2xl lg:col-span-2 print:border-black print:bg-white print:shadow-none"
					>
						<p
							class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300 print:text-black"
						>
							AI Incident Summary
						</p>

						<div
							class="mt-5 text-lg text-slate-300 print:text-sm print:text-black"
						>
							<AiSummary text={report.ai_summary} />
						</div>
					</div>

					<div
						class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl print:border-black print:bg-white print:shadow-none"
					>
						<p
							class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300 print:text-black"
						>
							Report Metadata
						</p>

						<div class="mt-5 space-y-4 text-sm">
							<div>
								<p class="text-slate-500 print:text-black">File Name</p>

								<p class="mt-1 font-mono text-slate-200 print:text-black">
									{report.file_name}
								</p>
							</div>

							<div>
								<p class="text-slate-500 print:text-black">Created</p>

								<p class="mt-1 font-mono text-slate-200 print:text-black">
									{report.created_at}
								</p>
							</div>

							<div>
								<p class="text-slate-500 print:text-black">
									Medium / Low
								</p>

								<p class="mt-1 font-mono text-slate-200 print:text-black">
									{report.medium_count} / {report.low_count}
								</p>
							</div>
						</div>
					</div>
				</section>

				<section class="mt-8 grid gap-8 lg:grid-cols-2 no-print">
					<div
						class="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8"
					>
						<p
							class="text-xs font-bold uppercase tracking-[0.3em] text-red-300"
						>
							Critical Findings
						</p>

						<p class="mt-3 text-4xl font-black text-red-300">
							{criticalEvents.length}
						</p>

						<p class="mt-4 text-slate-400">
							Events requiring immediate investigation.
						</p>
					</div>

					<div
						class="rounded-[2rem] border border-orange-500/20 bg-orange-500/5 p-8"
					>
						<p
							class="text-xs font-bold uppercase tracking-[0.3em] text-orange-300"
						>
							High Priority Findings
						</p>

						<p class="mt-3 text-4xl font-black text-orange-300">
							{highEvents.length}
						</p>

						<p class="mt-4 text-slate-400">
							Events that should be reviewed soon.
						</p>
					</div>
				</section>

				<section
					class="mt-8 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70 shadow-2xl print:border-black print:bg-white print:shadow-none"
				>
					<div class="border-b border-slate-800 px-6 py-5 print:border-black">
						<p
							class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300 print:text-black"
						>
							Detected Events
						</p>

						<h2 class="mt-2 text-2xl font-black print:text-xl">
							Security Event Breakdown
						</h2>
					</div>

					<div class="overflow-x-auto print:overflow-visible">
						<table class="w-full border-collapse text-sm">
							<thead class="bg-slate-950 print:bg-white">
								<tr
									class="text-left text-xs uppercase tracking-[0.2em] text-slate-500 print:text-black"
								>
									<th class="px-6 py-4 print:border print:border-black print:px-2">
										Line
									</th>

									<th class="px-6 py-4 print:border print:border-black print:px-2">
										Severity
									</th>

									<th class="px-6 py-4 print:border print:border-black print:px-2">
										Type
									</th>

									<th class="px-6 py-4 print:border print:border-black print:px-2">
										Source IP
									</th>

									<th class="px-6 py-4 print:border print:border-black print:px-2">
										Message
									</th>

									<th class="px-6 py-4 print:border print:border-black print:px-2">
										Recommendation
									</th>
								</tr>
							</thead>

							<tbody>
								{#each report.events as event}
									<tr
										class="border-t border-slate-800 align-top print:border-0"
									>
										<td
											class="px-6 py-5 font-mono text-sm text-slate-400 print:border print:border-black print:px-2 print:text-xs print:text-black"
										>
											{event.line_number}
										</td>

										<td
											class="px-6 py-5 print:border print:border-black print:px-2 print:text-xs print:text-black"
										>
											<span class="print:hidden">
												<SeverityBadge severity={event.severity} />
											</span>

											<span class="hidden print:inline">
												{event.severity}
											</span>
										</td>

										<td
											class="px-6 py-5 text-sm font-bold text-slate-200 print:border print:border-black print:px-2 print:text-xs print:text-black"
										>
											{event.event_type}
										</td>

										<td
											class="px-6 py-5 font-mono text-sm text-emerald-300 print:border print:border-black print:px-2 print:text-xs print:text-black"
										>
											{event.source_ip ?? 'N/A'}
										</td>

										<td
											class="max-w-xl px-6 py-5 font-mono text-sm leading-6 text-slate-300 print:border print:border-black print:px-2 print:text-xs print:text-black"
										>
											{event.message}
										</td>

										<td
											class="max-w-md px-6 py-5 text-sm leading-6 text-slate-400 print:border print:border-black print:px-2 print:text-xs print:text-black"
										>
											{event.recommendation}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</section>
			{/if}
		</div>
	</main>
</div>

<style>
	@media print {
		.no-print {
			display: none !important;
		}

		@page {
			margin: 0.5in;
		}
	}
</style>