import { resolve } from "node:path";
import { env } from "node:process";

const isDev = env.NODE_ENV !== "production";

export const CONFIG = {
	IS_DEV: isDev,
	PORT: Number(env.PORT) || 4000,
	LOG_LEVEL: env.LOG_LEVEL?.trim().toUpperCase() || (isDev ? "DEBUG" : "INFO"),
	CLIENT_DIST: resolve(import.meta.dirname, "../../client/dist"),
};
