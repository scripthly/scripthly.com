import { type Handler, Hono } from "hono";
import logging, { logColors } from "./logging.util.ts";

type RouteMethod = "get" | "post" | "put" | "delete" | "patch" | "use";

interface RouteRegistrationEvent {
	path: string;
	method: RouteMethod;
}

type TreeNode = {
	routes: RouteRegistrationEvent[];
	children: Record<string, TreeNode>;
};

const METHOD_COLORS: Record<RouteMethod, (typeof logColors)[keyof typeof logColors]> = {
	get: logColors.green,
	post: logColors.yellow,
	put: logColors.blue,
	patch: logColors.purple,
	delete: logColors.red,
	use: logColors.cyan,
};

const routes: RouteRegistrationEvent[] = [];
const routerPaths = new WeakMap<Hono, string>();

/**
 * Creates a Hono router bound to a base path so its routes are tracked by full path.
 * @param basePath Absolute mount path, e.g. `/api/roblox`.
 * @returns New Hono instance.
 */
export function createRouter(basePath: string): Hono {
	const router = new Hono();
	routerPaths.set(router, basePath);
	return router;
}

/**
 * Registers a route on a Hono router and records it for the startup route tree.
 * @param router Hono instance to attach the route to.
 * @param method HTTP method, or `use` for middleware.
 * @param path Path relative to the router's base.
 * @param handlers One or more Hono handlers.
 */
export function registerRoute(router: Hono, method: RouteMethod, path: string, ...handlers: [Handler, ...Handler[]]) {
	routes.push({ path: (routerPaths.get(router) ?? "") + path, method });

	if (method === "use") {
		router.use(path, ...handlers);
		return;
	}

	router.on(method.toUpperCase(), path, ...handlers);
}

/**
 * Mounts a child router on its parent and records the mount.
 * @param parent Parent Hono app.
 * @param path Mount path on the parent.
 * @param child Child router created with `createRouter`.
 */
export function mountRouter(parent: Hono, path: string, child: Hono) {
	routes.push({ path: (routerPaths.get(parent) ?? "") + path, method: "use" });
	parent.route(path, child);
}

/**
 * Logs every tracked route as a tree, leaf methods before `use` mounts.
 */
export function logRoutes() {
	const root: TreeNode = { routes: [], children: {} };

	for (const route of routes) {
		let node = root;

		for (const segment of route.path.split("/").filter(Boolean)) {
			node.children[segment] ??= { routes: [], children: {} };
			node = node.children[segment];
		}

		node.routes.push(route);
	}

	/**
	 * Depth-first print of one tree node and its children.
	 * @param node Current tree node.
	 */
	function printTree(node: TreeNode) {
		const ordered = [...node.routes.filter((r) => r.method !== "use"), ...node.routes.filter((r) => r.method === "use")];

		for (const { method, path } of ordered) {
			const color = METHOD_COLORS[method];
			const split = path.lastIndexOf("/");
			const styledPath = (split > 0 ? color.dim(path.slice(0, split)) : "") + color.bold(split > 0 ? path.slice(split) : path);

			logging.info("API", `${color(method.toUpperCase().padEnd(7))} ${styledPath}`);
		}

		for (const child of Object.values(node.children)) {
			printTree(child);
		}
	}

	printTree(root);
}
