import { createRouter, registerRoute } from "../../../util/route-tracker.util.ts";
import { getGames } from "./games.ts";

const robloxRoutes = createRouter("/api/roblox");

registerRoute(robloxRoutes, "get", "/games", getGames);

export default robloxRoutes;
