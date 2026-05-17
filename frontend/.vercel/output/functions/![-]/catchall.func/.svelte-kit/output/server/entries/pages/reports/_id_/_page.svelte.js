import "../../../../chunks/environment.js";
import { H as escape_html, l as store_get, o as head, u as unsubscribe_stores } from "../../../../chunks/dev.js";
import "../../../../chunks/navigation.js";
import { n as page, t as AppSidebar } from "../../../../chunks/AppSidebar.js";
import "../../../../chunks/AiSummary.js";
//#region src/routes/reports/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let reportId;
		let report = null;
		$: reportId = store_get($$store_subs ??= {}, "$page", page).params.id;
		$: report?.events?.filter((event) => event.severity === "Critical");
		$: report?.events?.filter((event) => event.severity === "High");
		head("iz0pwk", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Incident Report #${escape_html(reportId)} | ART3MIS SOC AI</title>`);
			});
		});
		$$renderer.push(`<div class="flex min-h-screen bg-slate-950 text-slate-100 print:block print:bg-white print:text-black"><div class="print:hidden">`);
		AppSidebar($$renderer, {});
		$$renderer.push(`<!----></div> <main class="flex-1 px-6 py-10 print:p-0"><div class="mx-auto max-w-7xl print:max-w-none"><div class="no-print flex items-center justify-between gap-4 svelte-iz0pwk"><a href="/dashboard" class="text-sm font-bold text-emerald-300 hover:text-emerald-200">← Back to Dashboard</a> <button class="rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-300">Print / Save PDF</button></div> <div class="mt-8 print:mt-0 print:border-b print:border-black print:pb-4"><div class="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 print:border-black print:bg-white print:text-black">ART3MIS SOC AI</div> <h1 class="mt-6 text-5xl font-black tracking-tight print:text-3xl">Incident Investigation Report</h1> <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-300 print:text-black">Saved cybersecurity log analysis with event detection, severity scoring,
					incident summary, and response recommendations.</p></div> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center">Loading report...</div>`);
		$$renderer.push(`<!--]--></div></main></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
