import "./environment.js";
import { H as escape_html, V as attr, a as ensure_array_like, l as store_get, n as attr_class, nt as getContext, u as unsubscribe_stores } from "./dev.js";
import { t as goto } from "./client.js";
import "./navigation.js";
//#region src/lib/auth.js
function isLoggedIn() {
	if (typeof localStorage === "undefined") return false;
	return Boolean(localStorage.getItem("token"));
}
function getUsername() {
	if (typeof localStorage === "undefined") return "";
	return localStorage.getItem("username") || "";
}
function requireAuth() {
	if (!isLoggedIn()) goto("/login");
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/app/stores.js
/**
* A function that returns all of the contextual stores. On the server, this must be called during component initialization.
* Only use this if you need to defer store subscription until after the component has mounted, for some reason.
*
* @deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
*/
var getStores = () => {
	const stores$1 = getContext("__svelte__");
	return {
		/** @type {typeof page} */
		page: { subscribe: stores$1.page.subscribe },
		/** @type {typeof navigating} */
		navigating: { subscribe: stores$1.navigating.subscribe },
		/** @type {typeof updated} */
		updated: stores$1.updated
	};
};
/**
* A readable store whose value contains page data.
*
* On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.
*
* @deprecated Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
* @type {import('svelte/store').Readable<import('@sveltejs/kit').Page>}
*/
var page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
//#endregion
//#region src/lib/components/AppSidebar.svelte
function AppSidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let currentPath;
		let username = "";
		const navItems = [
			{
				label: "Home",
				href: "/",
				icon: "⌂"
			},
			{
				label: "Dashboard",
				href: "/dashboard",
				icon: "◈"
			},
			{
				label: "Analyze Logs",
				href: "/upload",
				icon: "▣"
			}
		];
		function isActive(href) {
			if (href === "/") return currentPath === "/";
			return currentPath.startsWith(href);
		}
		$: currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
		$: username = getUsername();
		$$renderer.push(`<aside${attr_class(`min-h-screen border-r border-slate-800 bg-slate-950/95 text-slate-100 transition-all duration-300 w-72`)}><div class="sticky top-0 flex min-h-screen flex-col p-4"><div class="flex items-center justify-between gap-3">`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<a href="/dashboard" class="flex items-center gap-3"><img src="/images/art3mis_soc.png" alt="ART3MIS SOC AI" class="h-12 w-12 rounded-2xl border border-emerald-400/20 object-cover shadow-lg shadow-emerald-500/20"/> <div><p class="text-xs font-black uppercase tracking-[0.35em] text-emerald-300">ART3MIS</p> <p class="mt-1 text-sm text-slate-500">SOC AI Platform</p></div></a>`);
		$$renderer.push(`<!--]--> <button class="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-black text-emerald-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"${attr("title", "Collapse menu")}>${escape_html("←")}</button></div> <div class="mt-8 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="text-xs uppercase tracking-[0.25em] text-slate-500">Logged in as</p> <p class="mt-2 truncate font-black text-emerald-300">${escape_html(username || "Analyst")}</p>`);
		$$renderer.push(`<!--]--></div> <nav class="mt-8 space-y-3"><!--[-->`);
		const each_array = ensure_array_like(navItems);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<a${attr("href", item.href)}${attr_class(`flex items-center gap-3 rounded-2xl border px-4 py-3 font-bold transition ${isActive(item.href) ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100"}`)}${attr("title", item.label)}><span class="text-lg">${escape_html(item.icon)}</span> `);
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span>${escape_html(item.label)}</span>`);
			$$renderer.push(`<!--]--></a>`);
		}
		$$renderer.push(`<!--]--></nav> <div class="mt-8 rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-4">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="text-xs uppercase tracking-[0.25em] text-slate-500">System</p> <p class="mt-2 font-black text-emerald-300">Online</p> <p class="mt-1 text-xs text-slate-500">Docker stack active</p>`);
		$$renderer.push(`<!--]--></div> <div class="mt-auto space-y-3 pt-8">`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-4"><p class="text-xs uppercase tracking-[0.25em] text-slate-500">Mode</p> <p class="mt-2 text-sm font-bold text-slate-300">Local AI + SQLite</p></div>`);
		$$renderer.push(`<!--]--> <button class="w-full rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-black text-red-300 transition hover:bg-red-500/20" title="Logout">${escape_html("Logout")}</button></div></div></aside>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { page as n, requireAuth as r, AppSidebar as t };
