import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bikes._id-DigVjgHp.js
var $$splitNotFoundComponentImporter = () => import("./bikes._id-sj6e8HUC.mjs");
var $$splitErrorComponentImporter = () => import("./bikes._id-CBIsNX9M.mjs");
var $$splitComponentImporter = () => import("./bikes._id-BewAnlRH.mjs");
var Route = createFileRoute("/bikes/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
