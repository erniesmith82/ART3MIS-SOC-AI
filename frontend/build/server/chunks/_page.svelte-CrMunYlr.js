import { h as head, a as ensure_array_like, e as escape_html } from './dev-Bq1apss1.js';

//#region src/routes/+page.svelte
function _page($$renderer) {
	const features = [
		{
			title: "AI Log Analysis",
			text: "Upload logs and generate SOC-style incident summaries using local AI."
		},
		{
			title: "Threat Scoring",
			text: "Detect suspicious activity and classify events by severity."
		},
		{
			title: "Protected Dashboard",
			text: "JWT-authenticated dashboard with persistent reports and analytics."
		},
		{
			title: "Incident Reports",
			text: "View, print, export, and manage saved security investigations."
		}
	];
	head("1uha8ag", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>ART3MIS SOC AI | AI-Assisted Security Operations</title>`);
		});
	});
	$$renderer.push(`<main class="min-h-screen overflow-hidden bg-slate-950 text-slate-100"><section class="relative"><div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_35%)]"></div> <div class="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20"><div class="grid w-full gap-14 lg:grid-cols-2 lg:items-center"><div><div class="mb-8 flex items-center gap-4"><img src="/images/art3mis_soc.png" alt="ART3MIS SOC AI" class="h-20 w-20 rounded-3xl border border-emerald-400/20 object-cover shadow-2xl shadow-emerald-500/20"/> <div><p class="text-xs font-black uppercase tracking-[0.35em] text-emerald-300">ART3MIS SOC AI</p> <p class="mt-2 text-sm text-slate-400">Local AI Security Operations Platform</p></div></div> <h1 class="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">AI-assisted cybersecurity analysis for real SOC workflows.</h1> <p class="mt-8 max-w-2xl text-lg leading-8 text-slate-300">ART3MIS SOC AI analyzes security logs, detects suspicious activity,
						scores severity, generates local AI incident summaries, and stores
						investigation reports in a protected dashboard.</p> <div class="mt-10 flex flex-wrap gap-4"><a href="/login" class="rounded-2xl bg-emerald-400 px-7 py-4 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-300">Analyst Login</a> <a href="/dashboard" class="rounded-2xl border border-slate-700 bg-slate-900 px-7 py-4 font-black text-slate-100 transition hover:-translate-y-1 hover:border-emerald-400/50">Open Dashboard</a></div> <div class="mt-12 grid gap-3 sm:grid-cols-2"><div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"><p class="text-xs uppercase tracking-[0.25em] text-slate-500">Backend</p> <p class="mt-2 font-black text-emerald-300">FastAPI + SQLite</p></div> <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"><p class="text-xs uppercase tracking-[0.25em] text-slate-500">AI Engine</p> <p class="mt-2 font-black text-cyan-300">Local Ollama LLM</p></div></div></div> <div class="rounded-[2rem] border border-emerald-400/20 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-950/40 backdrop-blur"><div class="mb-5 flex items-center gap-2"><div class="h-3 w-3 rounded-full bg-red-400"></div> <div class="h-3 w-3 rounded-full bg-yellow-400"></div> <div class="h-3 w-3 rounded-full bg-emerald-400"></div> <p class="ml-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">incident console</p></div> <div class="space-y-4 font-mono text-sm"><div class="rounded-2xl bg-slate-950 p-4"><p class="text-red-300">[CRITICAL] brute force detected</p> <p class="mt-1 text-slate-500">source_ip: 185.220.101.45</p></div> <div class="rounded-2xl bg-slate-950 p-4"><p class="text-orange-300">[HIGH] failed password attempts</p> <p class="mt-1 text-slate-500">event_type: credential attack</p></div> <div class="rounded-2xl bg-slate-950 p-4"><p class="text-cyan-300">[AI] incident summary generated</p> <p class="mt-1 text-slate-500">engine: local_ollama_llm</p></div> <div class="rounded-2xl bg-slate-950 p-4"><p class="text-emerald-300">[DB] report saved</p> <p class="mt-1 text-slate-500">status: persistent_record_created</p></div></div></div></div></div></section> <section class="border-t border-slate-800 bg-slate-950 px-6 py-20"><div class="mx-auto max-w-7xl"><p class="text-xs font-black uppercase tracking-[0.35em] text-emerald-300">Platform Features</p> <h2 class="mt-4 text-4xl font-black tracking-tight">Built like a real security tool.</h2> <div class="mt-10 grid gap-6 md:grid-cols-4"><!--[-->`);
	const each_array = ensure_array_like(features);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let feature = each_array[$$index];
		$$renderer.push(`<div class="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-xl"><h3 class="text-xl font-black text-slate-100">${escape_html(feature.title)}</h3> <p class="mt-4 leading-7 text-slate-400">${escape_html(feature.text)}</p></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section></main>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CrMunYlr.js.map
