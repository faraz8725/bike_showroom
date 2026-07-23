import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Wrench, o as Sparkles, p as Gauge, s as ShieldCheck, u as MapPin, v as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as imageUrl, i as formatPrice, r as fetchBikes, t as SiteHeader } from "./bikes-CA_Q2TZB.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DujsFVln.js
var import_jsx_runtime = require_jsx_runtime();
function BikeCard({ bike }) {
	const cover = bike.images[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/bikes/$id",
		params: { id: bike.id },
		className: "group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-flame",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/3] overflow-hidden bg-muted",
			children: [
				cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageUrl(cover),
					alt: `${bike.brand} ${bike.model}`,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full place-items-center text-muted-foreground",
					children: "No photo"
				}),
				bike.sold && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-md bg-destructive px-2 py-1 text-xs font-bold uppercase tracking-wider text-destructive-foreground",
					children: "Sold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur",
					children: bike.year
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "truncate font-display text-xl uppercase tracking-wide",
						children: [
							bike.brand,
							" ",
							bike.model
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: bike.plate_number
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-3.5 w-3.5" }),
							" ",
							bike.km_driven.toLocaleString(),
							" km"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
							" ",
							bike.location
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-bold text-gradient-flame",
						children: formatPrice(Number(bike.price))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-wider text-primary",
						children: "View →"
					})]
				})
			]
		})]
	});
}
var hero_bike_default = "/assets/hero-bike-CLMov0JU.jpg";
function Home() {
	const { data: bikes, isLoading } = useQuery({
		queryKey: ["bikes"],
		queryFn: fetchBikes
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_bike_default,
						alt: "",
						width: 1920,
						height: 1080,
						className: "absolute inset-0 h-full w-full object-cover opacity-60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { background: "linear-gradient(180deg, oklch(0.16 0.01 60 / 0.4) 0%, oklch(0.12 0.01 60 / 0.95) 90%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-36",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary",
								children: "Certified Pre-Owned"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-5xl leading-none sm:text-7xl md:text-8xl",
								children: [
									"RIDE THE ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient-flame",
										children: "LEGEND"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									" AGAIN."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-lg text-muted-foreground",
								children: "Handpicked used motorcycles with verified papers, transparent plate details and cleared chalaans. What you see is what you ride home."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#inventory",
									className: "inline-flex items-center gap-2 rounded-md bg-gradient-flame px-6 py-3 font-semibold uppercase tracking-wide text-flame-foreground shadow-flame transition-transform hover:scale-[1.02]",
									children: ["Browse Inventory ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3",
								children: [
									{
										icon: ShieldCheck,
										title: "Verified Papers",
										desc: "RC, insurance & PUC on file"
									},
									{
										icon: Sparkles,
										title: "Chalaan Cleared",
										desc: "Zero pending challans"
									},
									{
										icon: Wrench,
										title: "Workshop Checked",
										desc: "Full mechanical inspection"
									}
								].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 font-display text-lg uppercase tracking-wide",
											children: f.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: f.desc
										})
									]
								}, f.title))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "inventory",
				className: "mx-auto max-w-7xl px-4 py-16 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-primary",
						children: "Inventory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl uppercase tracking-wide sm:text-5xl",
						children: "Available Bikes"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: bikes ? `${bikes.length} listed` : ""
					})]
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-80 animate-pulse rounded-xl bg-card" }, i))
				}) : bikes && bikes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: bikes.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BikeCard, { bike: b }, b.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-dashed border-border bg-card/40 p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl uppercase",
						children: "Garage is empty"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "No bikes listed yet. Check back soon — new inventory drops weekly."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/60 py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Ironforge Motors. All rides reserved."
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
