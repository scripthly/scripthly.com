import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	prettierRecommended,
	{
		ignores: ["**/node_modules/", "**/dist/", "apps/client/public/"],
	},
	{
		files: ["**/*.cjs"],
		languageOptions: {
			sourceType: "commonjs",
			globals: globals.node,
		},
	},
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: { jsx: true },
				projectService: {
					allowDefaultProject: ["eslint.config.mjs", "types/*.d.ts"],
					defaultProject: "tsconfig.base.json",
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			"simple-import-sort": simpleImportSort,
			"unused-imports": unusedImports,
			prettier: prettier,
			react,
		},
		rules: {
			"prettier/prettier": [
				"warn",
				{
					semi: true,
					trailingComma: "all",
					singleQuote: false,
					printWidth: 180,
					tabWidth: 4,
					useTabs: true,
					endOfLine: "auto",
				},
			],

			"simple-import-sort/imports": [
				"warn",
				{
					groups: [
						[
							"^\\u0000", // Side effect imports (e.g. import "some-polyfill")
							"^node:", // Node built-in modules
							"^@?\\w", // Third-party packages
							"^", // Absolute imports from your project (e.g., starting without a dot)
							"^\\.", // Relative imports (e.g., starting with "./" or "../")
						],
					],
				},
			],

			"simple-import-sort/exports": "warn",

			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-explicit-any": "off",

			"no-case-declarations": "off",
			"no-empty-pattern": "off",
			"no-void": "error",

			"react/jsx-uses-react": "error",
			"react/jsx-uses-vars": "error",

			"unused-imports/no-unused-imports": "warn",
			"unused-imports/no-unused-vars": "warn",

			"@typescript-eslint/member-ordering": [
				"warn",
				{
					default: [
						"signature",
						"public-static-field",
						"protected-static-field",
						"private-static-field",
						"public-decorated-field",
						"protected-decorated-field",
						"private-decorated-field",
						"public-instance-field",
						"protected-instance-field",
						"private-instance-field",
						"public-abstract-field",
						"protected-abstract-field",
						"public-field",
						"protected-field",
						"private-field",
						"static-field",
						"instance-field",
						"abstract-field",
						"decorated-field",
						"field",
						"public-constructor",
						"protected-constructor",
						"private-constructor",
						"constructor",
						"public-static-method",
						"protected-static-method",
						"private-static-method",
						"public-decorated-method",
						"protected-decorated-method",
						"private-decorated-method",
						"public-instance-method",
						"protected-instance-method",
						"private-instance-method",
						"public-abstract-method",
						"protected-abstract-method",
						"public-method",
						"protected-method",
						"private-method",
						"static-method",
						"instance-method",
						"abstract-method",
						"decorated-method",
						"method",
					],
				},
			],
		},
	},
);
