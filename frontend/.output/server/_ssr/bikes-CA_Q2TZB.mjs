import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C6ZaJElq.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as LogOut, m as Flame, s as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bikes-CA_Q2TZB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getToken() {
	return localStorage.getItem("token");
}
function clearToken() {
	localStorage.removeItem("token");
}
var API_URL$1 = "http://localhost:4000";
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function loadMe() {
			const token = getToken();
			if (!token) {
				setUser(null);
				setIsAdmin(false);
				setLoading(false);
				return;
			}
			try {
				const resp = await fetch(`${API_URL$1}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
				const data = await resp.json().catch(() => ({}));
				if (!resp.ok || !data.user) {
					clearToken();
					setUser(null);
					setIsAdmin(false);
					setLoading(false);
					return;
				}
				setUser({
					id: data.user.id,
					email: data.user.email
				});
				setIsAdmin(!!data.user.isAdmin);
			} catch {} finally {
				setLoading(false);
			}
		}
		loadMe();
	}, []);
	return {
		session: null,
		user,
		isAdmin,
		loading
	};
}
var API_URL = "http://localhost:4000";
function SiteHeader() {
	const { user, isAdmin } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-9 w-9 shrink-0 place-items-center rounded-md bg-gradient-flame shadow-flame",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
						className: "h-5 w-5 text-flame-foreground",
						strokeWidth: 2.5
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate font-display text-2xl tracking-wide",
					children: [
						"IRON",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient-flame",
							children: "FORGE"
						}),
						" MOTORS"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex",
						children: "Browse"
					}),
					isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Admin"]
						})
					}),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: async () => {
							const token = getToken();
							try {
								if (token) await fetch(`${API_URL}/auth/logout`, {
									method: "POST",
									headers: { Authorization: `Bearer ${token}` }
								});
							} finally {
								clearToken();
								window.location.assign("/auth");
							}
						},
						className: "gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "bg-gradient-flame text-flame-foreground hover:opacity-90",
							children: "Admin Login"
						})
					})
				]
			})]
		})
	});
}
async function fetchBikes() {
	const { data, error } = await supabase.from("bikes").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function fetchBike(id) {
	const { data, error } = await supabase.from("bikes").select("*").eq("id", id).maybeSingle();
	if (error) throw error;
	return data;
}
function formatPrice(n) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(n);
}
function imageUrl(path) {
	if (path.startsWith("http")) return path;
	const { data } = supabase.storage.from("bike-images").getPublicUrl(path);
	return data.publicUrl;
}
//#endregion
export { imageUrl as a, formatPrice as i, fetchBike as n, useAuth as o, fetchBikes as r, SiteHeader as t };
