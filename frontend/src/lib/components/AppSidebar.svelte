<script>
	import { page } from '$app/stores';
	import { logout, getUsername } from '$lib/auth';

	let collapsed = false;
	let username = '';

	$: currentPath = $page.url.pathname;

	$: username = getUsername();

	const navItems = [
		{
			label: 'Home',
			href: '/',
			icon: '⌂'
		},
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: '◈'
		},
		{
			label: 'Analyze Logs',
			href: '/upload',
			icon: '▣'
		}
	];

	function isActive(href) {
		if (href === '/') {
			return currentPath === '/';
		}

		return currentPath.startsWith(href);
	}
</script>

<aside
	class={`min-h-screen border-r border-slate-800 bg-slate-950/95 text-slate-100 transition-all duration-300 ${
		collapsed ? 'w-24' : 'w-72'
	}`}
>
	<div class="sticky top-0 flex min-h-screen flex-col p-4">
		<div class="flex items-center justify-between gap-3">
			{#if !collapsed}
				<a href="/dashboard" class="flex items-center gap-3">
					<img
						src="/images/art3mis_soc.png"
						alt="ART3MIS SOC AI"
						class="h-12 w-12 rounded-2xl border border-emerald-400/20 object-cover shadow-lg shadow-emerald-500/20"
					/>

					<div>
						<p
							class="text-xs font-black uppercase tracking-[0.35em] text-emerald-300"
						>
							ART3MIS
						</p>

						<p class="mt-1 text-sm text-slate-500">
							SOC AI Platform
						</p>
					</div>
				</a>
			{:else}
				<a
					href="/dashboard"
					class="mx-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-emerald-400/20 shadow-lg shadow-emerald-500/20"
				>
					<img
						src="/images/art3mis_soc.png"
						alt="ART3MIS SOC AI"
						class="h-full w-full object-cover"
					/>
				</a>
			{/if}

			<button
				on:click={() => (collapsed = !collapsed)}
				class="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-black text-emerald-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
				title={collapsed ? 'Expand menu' : 'Collapse menu'}
			>
				{collapsed ? '☰' : '←'}
			</button>
		</div>

		<div
			class="mt-8 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4"
		>
			{#if collapsed}
				<p class="text-center text-xl font-black text-emerald-300">
					{username ? username.slice(0, 1).toUpperCase() : 'A'}
				</p>
			{:else}
				<p class="text-xs uppercase tracking-[0.25em] text-slate-500">
					Logged in as
				</p>

				<p class="mt-2 truncate font-black text-emerald-300">
					{username || 'Analyst'}
				</p>
			{/if}
		</div>

		<nav class="mt-8 space-y-3">
			{#each navItems as item}
				<a
					href={item.href}
					class={`flex items-center gap-3 rounded-2xl border px-4 py-3 font-bold transition ${
						isActive(item.href)
							? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
							: 'border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100'
					}`}
					title={item.label}
				>
					<span class="text-lg">
						{item.icon}
					</span>

					{#if !collapsed}
						<span>
							{item.label}
						</span>
					{/if}
				</a>
			{/each}
		</nav>

		<div
			class="mt-8 rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-4"
		>
			{#if collapsed}
				<p class="text-center text-emerald-300">
					●
				</p>
			{:else}
				<p class="text-xs uppercase tracking-[0.25em] text-slate-500">
					System
				</p>

				<p class="mt-2 font-black text-emerald-300">
					Online
				</p>

				<p class="mt-1 text-xs text-slate-500">
					Docker stack active
				</p>
			{/if}
		</div>

		<div class="mt-auto space-y-3 pt-8">
			{#if !collapsed}
				<div
					class="rounded-[1.5rem] border border-slate-800 bg-slate-900/70 p-4"
				>
					<p class="text-xs uppercase tracking-[0.25em] text-slate-500">
						Mode
					</p>

					<p class="mt-2 text-sm font-bold text-slate-300">
						Local AI + SQLite
					</p>
				</div>
			{/if}

			<button
				on:click={logout}
				class="w-full rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-black text-red-300 transition hover:bg-red-500/20"
				title="Logout"
			>
				{collapsed ? '⏻' : 'Logout'}
			</button>
		</div>
	</div>
</aside>