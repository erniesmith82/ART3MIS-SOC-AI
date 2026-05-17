
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/dashboard" | "/login" | "/reports" | "/reports/[id]" | "/upload";
		RouteParams(): {
			"/reports/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/dashboard": Record<string, never>;
			"/login": Record<string, never>;
			"/reports": { id?: string };
			"/reports/[id]": { id: string };
			"/upload": Record<string, never>
		};
		Pathname(): "/" | "/dashboard" | "/login" | `/reports/${string}` & {} | "/upload";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/art3mis_soc.png" | string & {};
	}
}