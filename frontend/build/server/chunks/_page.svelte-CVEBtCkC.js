import { a as ensure_array_like, e as escape_html, f as fallback, b as bind_props } from './dev-Bq1apss1.js';
import './client-DJ19hp-u.js';
import { A as AppSidebar } from './AppSidebar-C51_88kB.js';
import 'chart.js/auto';
import './internal-EJiQ30UJ.js';

//#region src/lib/components/SeverityChart.svelte
function SeverityChart($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let critical = fallback($$props["critical"], 0);
		let high = fallback($$props["high"], 0);
		let medium = fallback($$props["medium"], 0);
		let low = fallback($$props["low"], 0);
		$$renderer.push(`<div class="relative mx-auto max-w-md"><canvas></canvas></div>`);
		bind_props($$props, {
			critical,
			high,
			medium,
			low
		});
	});
}
//#endregion
//#region src/routes/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let totalReports, totalSuspicious, totalCritical, totalHigh, totalMedium, totalLow, stats;
		let reports = [];
		let topIps = [];
		totalReports = reports.length;
		totalSuspicious = reports.reduce((sum, report) => sum + (report.suspicious_count || 0), 0);
		totalCritical = reports.reduce((sum, report) => sum + (report.critical_count || 0), 0);
		totalHigh = reports.reduce((sum, report) => sum + (report.high_count || 0), 0);
		totalMedium = reports.reduce((sum, report) => sum + (report.medium_count || 0), 0);
		totalLow = reports.reduce((sum, report) => sum + (report.low_count || 0), 0);
		stats = [
			{
				label: "Logs Analyzed",
				value: totalReports,
				hint: "Saved scan reports"
			},
			{
				label: "Suspicious Events",
				value: totalSuspicious,
				hint: "Detected threats"
			},
			{
				label: "Critical Alerts",
				value: totalCritical,
				hint: "Immediate action"
			},
			{
				label: "High Alerts",
				value: totalHigh,
				hint: "Needs review"
			}
		];
		$$renderer.push(`<div class="flex min-h-screen bg-slate-950 text-slate-100">`);
		AppSidebar($$renderer);
		$$renderer.push(`<!----> <main class="flex-1 px-6 py-10"><div class="mx-auto max-w-7xl"><div class="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><a href="/" class="text-sm font-bold text-emerald-300 hover:text-emerald-200">← Back Home</a> <div class="mt-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">ART3MIS SOC AI</div> <h1 class="mt-6 text-5xl font-black tracking-tight">SOC Dashboard</h1> <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Monitor analyzed logs, review severity trends, and track detected
						security events.</p></div> <div class="flex flex-wrap gap-3"><a href="/upload" class="rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-300">Analyze Logs</a> `);
		if (reports.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button class="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-black text-red-300 transition hover:-translate-y-1 hover:bg-red-500/20">Delete All Reports</button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <section class="mt-10 grid gap-4 md:grid-cols-4"><!--[-->`);
		const each_array = ensure_array_like(stats);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let stat = each_array[$$index];
			$$renderer.push(`<div class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-xl"><p class="text-sm text-slate-400">${escape_html(stat.label)}</p> <p class="mt-3 text-5xl font-black">${escape_html(stat.value)}</p> <p class="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">${escape_html(stat.hint)}</p></div>`);
		}
		$$renderer.push(`<!--]--></section> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <section class="mt-8 grid gap-8 lg:grid-cols-3"><div class="rounded-[2rem] border border-emerald-400/20 bg-slate-900/70 p-8 shadow-2xl lg:col-span-2"><p class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Threat Distribution</p> <h2 class="mt-3 text-2xl font-black">Severity Analytics</h2> <p class="mt-4 max-w-2xl leading-7 text-slate-400">Visual breakdown of detected security event severity across all
						saved reports.</p> <div class="mt-8">`);
		if (totalCritical + totalHigh + totalMedium + totalLow > 0) {
			$$renderer.push("<!--[0-->");
			SeverityChart($$renderer, {
				critical: totalCritical,
				high: totalHigh,
				medium: totalMedium,
				low: totalLow
			});
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center"><p class="text-lg font-black text-slate-300">No severity data yet</p> <p class="mt-3 text-slate-500">Analyze logs to populate the severity chart.</p></div>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl"><p class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">System Status</p> <div class="mt-6 space-y-4"><div class="rounded-2xl bg-slate-950 p-4"><p class="text-sm text-slate-500">Backend API</p> <p class="mt-2 font-black text-emerald-300">Online</p></div> <div class="rounded-2xl bg-slate-950 p-4"><p class="text-sm text-slate-500">Database</p> <p class="mt-2 font-black text-emerald-300">SQLite Active</p></div> <div class="rounded-2xl bg-slate-950 p-4"><p class="text-sm text-slate-500">Reports Stored</p> <p class="mt-2 font-black text-emerald-300">${escape_html(reports.length)}</p></div></div></div></section> <section class="mt-8 grid gap-8 lg:grid-cols-3"><div class="rounded-[2rem] border border-cyan-500/20 bg-slate-900/70 p-8 shadow-2xl lg:col-span-2"><p class="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Threat Intelligence</p> <h2 class="mt-3 text-2xl font-black">Top Source IPs</h2> <p class="mt-4 max-w-2xl leading-7 text-slate-400">Most frequently detected source IP addresses across all saved
						security events.</p> <div class="mt-8 space-y-4">`);
		if (topIps.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(topIps);
			for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
				let ip = each_array_1[index];
				$$renderer.push(`<div class="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950 p-5"><div class="flex items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 font-black text-cyan-300">#${escape_html(index + 1)}</div> <div><p class="font-mono text-lg font-black text-red-300">${escape_html(ip.source_ip)}</p> <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Detected Source</p></div></div> <div class="text-right"><p class="text-3xl font-black text-slate-100">${escape_html(ip.total)}</p> <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Events</p></div></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center"><p class="text-lg font-black text-slate-300">No source IP data yet</p> <p class="mt-3 text-slate-500">Analyze logs containing IP addresses to populate this section.</p></div>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl"><p class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Analyst Note</p> <h2 class="mt-3 text-2xl font-black">Why this matters</h2> <p class="mt-4 leading-7 text-slate-400">Repeated activity from the same IP can indicate brute-force
						attempts, credential attacks, scripted scans, or automated probing.</p> <div class="mt-6 rounded-3xl bg-slate-950 p-5 font-mono text-sm text-slate-400">signal: repeated_source_ip<br/> use_case: triage_priority<br/> action: investigate_top_sources</div></div></section> <section class="mt-8 rounded-[2rem] border border-emerald-400/20 bg-slate-900/70 p-6 shadow-2xl"><div class="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Saved Reports</p> <h2 class="mt-2 text-2xl font-black">Analysis History</h2></div> <div class="flex flex-wrap gap-3"><span class="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-slate-400">Real Database Data</span> `);
		if (reports.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button class="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/20">Delete All</button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="mt-6 rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center"><p class="text-lg font-black text-slate-300">Loading reports...</p></div>`);
		$$renderer.push(`<!--]--></section></div></main></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CVEBtCkC.js.map
