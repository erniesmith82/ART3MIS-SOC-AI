import { e as escape_html, c as attr, f as fallback, b as bind_props } from './dev-Bq1apss1.js';
import { A as AppSidebar } from './AppSidebar-C51_88kB.js';
import './client-DJ19hp-u.js';
import './internal-EJiQ30UJ.js';

//#region src/lib/components/LoadingOverlay.svelte
function LoadingOverlay($$renderer, $$props) {
	let show = fallback($$props["show"], false);
	let title = fallback($$props["title"], "Deploying synaptic overdrive...");
	let message = fallback($$props["message"], "ART3MIS is processing intelligence.");
	if (show) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-6 backdrop-blur-md"><div class="w-full max-w-md rounded-[2rem] border border-emerald-400/20 bg-slate-900/95 p-8 text-center shadow-2xl shadow-emerald-500/10"><div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10"><div class="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-300"></div></div> <p class="mt-8 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">ART3MIS SOC AI</p> <h2 class="mt-4 text-2xl font-black text-slate-100">${escape_html(title)}</h2> <p class="mt-4 leading-7 text-slate-400">${escape_html(message)}</p> <div class="mt-8 space-y-3 text-left font-mono text-xs text-slate-500"><div class="rounded-xl bg-slate-950 p-3"><span class="text-emerald-300">status:</span> analyzing_signal</div> <div class="rounded-xl bg-slate-950 p-3"><span class="text-cyan-300">engine:</span> local_ollama_llm</div> <div class="rounded-xl bg-slate-950 p-3"><span class="text-orange-300">mode:</span> incident_triage</div></div></div></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]-->`);
	bind_props($$props, {
		show,
		title,
		message
	});
}
//#endregion
//#region src/routes/upload/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let logText = "";
		let loading = false;
		$$renderer.push(`<div class="flex min-h-screen bg-slate-950 text-slate-100">`);
		LoadingOverlay($$renderer, {
			show: loading,
			title: "Deploying synaptic overdrive...",
			message: "ART3MIS is analyzing logs, scoring threats, and generating the incident summary."
		});
		$$renderer.push(`<!----> `);
		AppSidebar($$renderer);
		$$renderer.push(`<!----> <main class="flex-1 px-6 py-10"><div class="mx-auto max-w-7xl"><div><div class="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">ART3MIS SOC AI</div> <h1 class="mt-6 text-5xl font-black tracking-tight">Security Log Analyzer</h1> <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Paste raw logs or upload a security log file. ART3MIS SOC AI will
					detect suspicious activity, assign threat severity, and generate an
					AI-assisted incident summary.</p></div> <section class="mt-10 grid gap-8 lg:grid-cols-2"><div class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl"><h2 class="text-2xl font-black">Paste Log Text</h2> <textarea class="mt-6 min-h-[400px] w-full rounded-3xl border border-slate-700 bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none transition focus:border-emerald-400" placeholder="Paste logs here...">`);
		const $$body = escape_html(logText);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea> <button${attr("disabled", loading, true)} class="mt-6 rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50">${escape_html("Analyze Text")}</button></div> <div class="space-y-8"><div class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl"><h2 class="text-2xl font-black">Upload Log File</h2> <div class="mt-6 rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center"><input type="file" accept=".txt,.log,.csv" class="mx-auto block text-sm text-slate-300"/> <p class="mt-4 text-sm text-slate-500">Supported formats: .txt .log .csv</p></div> <button${attr("disabled", loading, true)} class="mt-6 rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50">${escape_html("Upload + Analyze")}</button></div> <div class="rounded-[2rem] border border-emerald-400/20 bg-slate-900/70 p-6 shadow-xl"><p class="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">Test Data</p> <p class="mt-3 text-sm leading-7 text-slate-400">Test file included:</p> <div class="mt-4 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-emerald-300">backend/sample_logs/sample_auth.log</div></div></div></section> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></main></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-q3x79RWt.js.map
