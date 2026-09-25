import assert from "node:assert";
import { existsSync } from "node:fs";
import { env } from "node:process";
import { inspect } from "node:util";
import { Chalk } from "chalk";
import logging, { type LogLevelDesc, type LogLevelNames } from "loglevel";
import { CONFIG } from "../config.ts";

// ? Docker has no TTY, so chalk would otherwise strip every colour from container logs.
const chalk = env.NO_COLOR ? new Chalk({ level: 0 }) : existsSync("/.dockerenv") ? new Chalk({ level: 2 }) : new Chalk();

type AppName = keyof typeof appColors;

export const logColors = {
	blue: chalk.ansi256(111),
	cyan: chalk.ansi256(159),
	green: chalk.ansi256(114),
	yellow: chalk.ansi256(228),
	red: chalk.ansi256(203),
	purple: chalk.ansi256(141),
	orange: chalk.ansi256(215),
	grey: chalk.ansi256(247),
	darkGrey: chalk.ansi256(243),
} as const;

const logLevelMapping = {
	trace: "Trace",
	debug: "Debug",
	info: "Info",
	warn: "Warn",
	error: "Error",
} as const;

const logLevelColors = {
	Trace: logColors.blue,
	Debug: logColors.cyan,
	Info: logColors.green,
	Warn: logColors.yellow,
	Error: logColors.red,
	Silent: logColors.grey,
} as const;

export const appColors = {
	Server: logColors.purple,
	API: logColors.cyan,
	Roblox: logColors.orange,
};

const LOG_LEVEL = CONFIG.LOG_LEVEL as LogLevelDesc;
const MAX_LOG_LEVEL_LENGTH = Math.max(...Object.keys(logLevelColors).map((name) => name.length));
const MAX_APP_NAME_LENGTH = Math.max(...Object.keys(appColors).map((name) => name.length));

/**
 * Renders an unknown thrown value as a readable, single-line message.
 * @param error Thrown value, which may or may not be an `Error`.
 * @returns The error message, the string itself, or an inspected form of the value.
 */
export function formatError(error: unknown): string {
	if (error instanceof Error) return error.message || error.name;
	if (typeof error === "string") return error;
	return inspect(error, { depth: 2, colors: false, compact: true, breakLength: 120 });
}

assert(LOG_LEVEL in logging.levels, `Invalid log level: ${LOG_LEVEL}`);

const originalFactory = logging.methodFactory;

/**
 * Builds each loglevel method so every line starts with the time, level and app name.
 * @param methodName Log method being built, such as `info`.
 * @param logLevel Level the logger is set to.
 * @param loggerName Name of the logger.
 * @returns Log function that takes the app name first.
 */
logging.methodFactory = function (methodName, logLevel, loggerName) {
	const rawMethod = originalFactory(methodName, logLevel, loggerName);

	/**
	 * Logs a message under an app's coloured label.
	 * @param appName App the message belongs to.
	 * @param message Parts of the message.
	 */
	return function (appName: AppName, ...message: string[]) {
		const currentDate = new Date().toLocaleTimeString("en-GB", { hour12: false });
		const logLevelName = logLevelMapping[methodName as LogLevelNames];

		const logColor = logLevelColors[logLevelName] || logColors.grey;
		const appColor = appColors[appName] || logColors.grey;

		const paddedLogLevel = logLevelName.toUpperCase().padEnd(MAX_LOG_LEVEL_LENGTH, " ");
		const paddedAppName = appName.padEnd(MAX_APP_NAME_LENGTH, " ");

		rawMethod(`${currentDate} | ${logColor(paddedLogLevel)} | ${appColor(paddedAppName)} |`, ...message);
	};
};

logging.rebuild();
logging.setLevel(LOG_LEVEL);

export default logging;
