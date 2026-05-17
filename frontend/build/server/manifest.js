const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/art3mis_soc.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CP4FvHSW.js",app:"_app/immutable/entry/app.D7RM6YtI.js",imports:["_app/immutable/entry/start.CP4FvHSW.js","_app/immutable/chunks/xuikgOGy.js","_app/immutable/chunks/BQTgXcn6.js","_app/immutable/entry/app.D7RM6YtI.js","_app/immutable/chunks/BQTgXcn6.js","_app/immutable/chunks/B0BvW1x3.js","_app/immutable/chunks/Cfug8aQt.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CPQ129EN.js')),
			__memo(() => import('./chunks/1-UeFSBu1Y.js')),
			__memo(() => import('./chunks/2-D0ZeH-Bo.js')),
			__memo(() => import('./chunks/3-2LysePZi.js')),
			__memo(() => import('./chunks/4-uAQStiRk.js')),
			__memo(() => import('./chunks/5-Cmfw8kEw.js')),
			__memo(() => import('./chunks/6-DfG_brLi.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/reports/[id]",
				pattern: /^\/reports\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/upload",
				pattern: /^\/upload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
