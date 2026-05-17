import { H as escape_html, V as attr, o as head } from "../../../chunks/dev.js";
import "../../../chunks/navigation.js";
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let username = "parzival";
		let password = "Password123!";
		let loading = false;
		head("1x05zx6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Login | ART3MIS SOC AI</title>`);
			});
		});
		$$renderer.push(`<div class="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100"><div class="grid w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/70 shadow-2xl lg:grid-cols-2"><div class="relative hidden overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between"><div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_55%)]"></div> <div class="relative z-10 p-10"><div class="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">SECURITY OPERATIONS CENTER</div> <h1 class="mt-8 text-6xl font-black leading-none tracking-tight">ART3MIS</h1> <p class="mt-6 max-w-md text-lg leading-8 text-slate-400">AI-assisted cybersecurity incident analysis, log ingestion,
					threat triage, and SOC reporting.</p></div> <div class="relative z-10 flex flex-1 items-center justify-center px-10 pb-10"><img src="/images/art3mis_soc.png" alt="ART3MIS SOC AI" class="w-full max-w-md rounded-[2rem] border border-emerald-400/20 shadow-2xl shadow-emerald-500/20"/></div></div> <div class="flex items-center justify-center p-8 sm:p-12"><div class="w-full max-w-md"><div class="flex items-center gap-4 lg:hidden"><img src="/images/art3mis_soc.png" alt="ART3MIS SOC AI" class="h-16 w-16 rounded-2xl border border-emerald-400/20 shadow-lg shadow-emerald-500/20"/> <div><p class="text-xs font-black uppercase tracking-[0.35em] text-emerald-300">ART3MIS</p> <p class="mt-1 text-sm text-slate-500">SOC AI Platform</p></div></div> <p class="mt-10 text-xs font-black uppercase tracking-[0.35em] text-emerald-300">ART3MIS SOC AI</p> <h2 class="mt-4 text-5xl font-black tracking-tight">Analyst Login</h2> <p class="mt-5 leading-8 text-slate-400">Sign in to access the SOC dashboard, reports,
					analytics, and log analysis tools.</p> <form class="mt-10 space-y-6"><div><label for="username" class="block text-sm font-bold text-slate-200">Username</label> <input id="username"${attr("value", username)} type="text" placeholder="Enter username" class="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-slate-100 outline-none transition focus:border-emerald-400"/></div> <div><label for="password" class="block text-sm font-bold text-slate-200">Password</label> <input id="password"${attr("value", password)} type="password" placeholder="Enter password" class="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-slate-100 outline-none transition focus:border-emerald-400"/></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="w-full rounded-2xl bg-emerald-400 px-6 py-4 text-lg font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50">${escape_html("Sign In")}</button></form> <div class="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-5"><p class="text-xs uppercase tracking-[0.25em] text-slate-500">Demo Credentials</p> <p class="mt-3 font-mono text-sm text-emerald-300">Username: parzival</p> <p class="mt-2 font-mono text-sm text-emerald-300">Password: Password123!</p></div></div></div></div></div>`);
	});
}
//#endregion
export { _page as default };
