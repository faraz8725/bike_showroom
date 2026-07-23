globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, i as defineLazyEventHandler, n as HTTPError, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-13T02:45:23.065Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-BNmj9eeb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"acca-Tj1wuAUkkDv1EeIxlGdc6oqQZsQ\"",
		"mtime": "2026-07-18T18:00:03.934Z",
		"size": 44234,
		"path": "../public/assets/admin-BNmj9eeb.js"
	},
	"/assets/auth-28VoRos8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a8b-IuOHUiePx18H7fkuIJOiiHrwctE\"",
		"mtime": "2026-07-18T18:00:03.934Z",
		"size": 10891,
		"path": "../public/assets/auth-28VoRos8.js"
	},
	"/assets/bebas-neue-latin-400-normal-9mHNbWWO.woff2": {
		"type": "font/woff2",
		"etag": "\"35c8-HwY72aPfqN/QTgccChg2mpcfg1E\"",
		"mtime": "2026-07-18T18:00:03.944Z",
		"size": 13768,
		"path": "../public/assets/bebas-neue-latin-400-normal-9mHNbWWO.woff2"
	},
	"/assets/bebas-neue-latin-400-normal-Bi-ndsyu.woff": {
		"type": "font/woff",
		"etag": "\"2bac-eEj3nehPbQ71i2QuxVclm03KwLw\"",
		"mtime": "2026-07-18T18:00:03.945Z",
		"size": 11180,
		"path": "../public/assets/bebas-neue-latin-400-normal-Bi-ndsyu.woff"
	},
	"/assets/bebas-neue-latin-ext-400-normal-DWiEslNC.woff2": {
		"type": "font/woff2",
		"etag": "\"22e0-mzPqRLuD3PyHiYXLyEc0J5G7qos\"",
		"mtime": "2026-07-18T18:00:03.946Z",
		"size": 8928,
		"path": "../public/assets/bebas-neue-latin-ext-400-normal-DWiEslNC.woff2"
	},
	"/assets/bebas-neue-latin-ext-400-normal-HFKRJXnW.woff": {
		"type": "font/woff",
		"etag": "\"1d60-ft2TUJBxdO2bxlvUsr1cy9Aohts\"",
		"mtime": "2026-07-18T18:00:03.947Z",
		"size": 7520,
		"path": "../public/assets/bebas-neue-latin-ext-400-normal-HFKRJXnW.woff"
	},
	"/assets/bikes-C04-J7vW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f61-sAUTZyTqHudQ10Uar/4otZBDEMk\"",
		"mtime": "2026-07-18T18:00:03.935Z",
		"size": 12129,
		"path": "../public/assets/bikes-C04-J7vW.js"
	},
	"/assets/bikes._id-BeaDGfhf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-fuew7vl7VVWx/OwDPwMiDiPGvU0\"",
		"mtime": "2026-07-18T18:00:03.936Z",
		"size": 167,
		"path": "../public/assets/bikes._id-BeaDGfhf.js"
	},
	"/assets/bikes._id-cvje1WlK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-gvevdg74wQnGpNlwzVbgp10534M\"",
		"mtime": "2026-07-18T18:00:03.937Z",
		"size": 204,
		"path": "../public/assets/bikes._id-cvje1WlK.js"
	},
	"/assets/bikes._id-DqnnqLp4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a2-hsOFp0qhmJFaY+k3CgaZuaTC1OE\"",
		"mtime": "2026-07-18T18:00:03.937Z",
		"size": 5794,
		"path": "../public/assets/bikes._id-DqnnqLp4.js"
	},
	"/assets/button-CuagVPmB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7fb8-GmuuQBWly7GyHBZhIYmm/a87boQ\"",
		"mtime": "2026-07-18T18:00:03.938Z",
		"size": 32696,
		"path": "../public/assets/button-CuagVPmB.js"
	},
	"/assets/dist-CvxI63CG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d1-FHjmlf6XmgItC8zxE7bKubJraVU\"",
		"mtime": "2026-07-18T18:00:03.940Z",
		"size": 6353,
		"path": "../public/assets/dist-CvxI63CG.js"
	},
	"/assets/hero-bike-CLMov0JU.jpg": {
		"type": "image/jpeg",
		"etag": "\"1226e-YiUsoK5szwvSqwEvH16Od8HgRkA\"",
		"mtime": "2026-07-18T18:00:03.947Z",
		"size": 74350,
		"path": "../public/assets/hero-bike-CLMov0JU.jpg"
	},
	"/assets/client-CozllJ4A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33294-c5nqMbKQp5KD0ILAKLVtJ0fuSSk\"",
		"mtime": "2026-07-18T18:00:03.939Z",
		"size": 209556,
		"path": "../public/assets/client-CozllJ4A.js"
	},
	"/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2": {
		"type": "font/woff2",
		"etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
		"mtime": "2026-07-18T18:00:03.948Z",
		"size": 25960,
		"path": "../public/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2"
	},
	"/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2": {
		"type": "font/woff2",
		"etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
		"mtime": "2026-07-18T18:00:03.949Z",
		"size": 18748,
		"path": "../public/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2"
	},
	"/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2": {
		"type": "font/woff2",
		"etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
		"mtime": "2026-07-18T18:00:03.949Z",
		"size": 11232,
		"path": "../public/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2"
	},
	"/assets/inter-greek-wght-normal-CkhJZR-_.woff2": {
		"type": "font/woff2",
		"etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
		"mtime": "2026-07-18T18:00:03.950Z",
		"size": 18996,
		"path": "../public/assets/inter-greek-wght-normal-CkhJZR-_.woff2"
	},
	"/assets/index-Cb6KzBDd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54f57-p6n7+710Ew16UeEW9iZvxoD/NQU\"",
		"mtime": "2026-07-18T18:00:03.933Z",
		"size": 347991,
		"path": "../public/assets/index-Cb6KzBDd.js"
	},
	"/assets/inter-latin-wght-normal-Dx4kXJAl.woff2": {
		"type": "font/woff2",
		"etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
		"mtime": "2026-07-18T18:00:03.952Z",
		"size": 48256,
		"path": "../public/assets/inter-latin-wght-normal-Dx4kXJAl.woff2"
	},
	"/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2": {
		"type": "font/woff2",
		"etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
		"mtime": "2026-07-18T18:00:03.951Z",
		"size": 85068,
		"path": "../public/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2"
	},
	"/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2": {
		"type": "font/woff2",
		"etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
		"mtime": "2026-07-18T18:00:03.954Z",
		"size": 10252,
		"path": "../public/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-07-18T18:00:03.940Z",
		"size": 939,
		"path": "../public/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/map-pin-CpwtKwPM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-UmcAVMmmjYLz7lGfFGTTLo7bNl4\"",
		"mtime": "2026-07-18T18:00:03.941Z",
		"size": 372,
		"path": "../public/assets/map-pin-CpwtKwPM.js"
	},
	"/assets/route-BntuvciC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-KU5TWcWgcI3BrBxcAVbxuxV79/A\"",
		"mtime": "2026-07-18T18:00:03.942Z",
		"size": 141,
		"path": "../public/assets/route-BntuvciC.js"
	},
	"/assets/routes-DPnYMhUU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8c-7pXA2aGBANmeZZJ/CsSicAP+s2A\"",
		"mtime": "2026-07-18T18:00:03.942Z",
		"size": 6796,
		"path": "../public/assets/routes-DPnYMhUU.js"
	},
	"/assets/styles-CYG1Xb-v.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"132f7-7ERshgbMitxnERmHIlmf0j19CPs\"",
		"mtime": "2026-07-18T18:00:03.955Z",
		"size": 78583,
		"path": "../public/assets/styles-CYG1Xb-v.css"
	},
	"/assets/useRouter-Buw3_9xO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dbf-WdY1P2rk2Ce5Sc+XWTDRTQ4zcvI\"",
		"mtime": "2026-07-18T18:00:03.943Z",
		"size": 7615,
		"path": "../public/assets/useRouter-Buw3_9xO.js"
	},
	"/assets/useStore-amCPjMjI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab8-6Kg906rZbTdfMfcvgepdi72/cl4\"",
		"mtime": "2026-07-18T18:00:03.944Z",
		"size": 19128,
		"path": "../public/assets/useStore-amCPjMjI.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_PSLpJS = defineLazyEventHandler(() => import("./_chunks/renderer-template.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_PSLpJS
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
