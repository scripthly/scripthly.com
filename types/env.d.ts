/// <reference types="node" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV?: "development" | "production";
			PORT?: string;
			LOG_LEVEL?: string;
			STATIC_DIR?: string;
		}
	}
}

export {};
