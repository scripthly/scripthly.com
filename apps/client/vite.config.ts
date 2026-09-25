import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		rolldownOptions: {
			output: {
				// ? Dependencies change far less often than site code, so they get their own long-cached chunk.
				codeSplitting: {
					groups: [{ name: "vendor", test: /node_modules/ }],
				},
			},
		},
	},
	server: {
		port: 3000,
		proxy: {
			"/api": "http://localhost:4000",
		},
	},
});
