import { H as escape_html, Z as fallback, d as html, n as attr_class, r as bind_props } from "./dev.js";
//#region src/lib/components/SeverityBadge.svelte
function SeverityBadge($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let classes;
		let severity = fallback($$props["severity"], "Low");
		$: classes = {
			Critical: "bg-red-500/15 text-red-300 ring-red-500/40",
			High: "bg-orange-500/15 text-orange-300 ring-orange-500/40",
			Medium: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/40",
			Low: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40"
		}[severity] ?? "bg-slate-500/15 text-slate-300 ring-slate-500/40";
		$$renderer.push(`<span${attr_class(`rounded-full px-3 py-1 text-xs font-bold ring-1 ${classes}`)}>${escape_html(severity)}</span>`);
		bind_props($$props, { severity });
	});
}
//#endregion
//#region src/lib/components/AiSummary.svelte
function AiSummary($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let text = fallback($$props["text"], "");
		function escapeHtml(value) {
			return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
		}
		function formatSummary(value) {
			if (!value) return "";
			let safe = escapeHtml(value);
			safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
			safe = safe.replace(/\n{2,}/g, "</p><p>");
			safe = safe.replace(/\n/g, "<br />");
			return `<p>${safe}</p>`;
		}
		$$renderer.push(`<div class="ai-summary svelte-1brkiba">${html(formatSummary(text))}</div>`);
		bind_props($$props, { text });
	});
}
//#endregion
export { SeverityBadge as n, AiSummary as t };
