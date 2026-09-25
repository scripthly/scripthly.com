import type { IconType } from "react-icons";
import { LuDatabase, LuDatabaseZap, LuFlame, LuFolderSync, LuGlobe, LuServer, LuWebhook } from "react-icons/lu";
import {
	SiCloudflare,
	SiCloudflareworkers,
	SiDiscorddotjs,
	SiDocker,
	SiExpress,
	SiFfmpeg,
	SiGit,
	SiGithubactions,
	SiHono,
	SiHtml5,
	SiJavascript,
	SiLinux,
	SiLuau,
	SiMantine,
	SiMongodb,
	SiMui,
	SiNodedotjs,
	SiPatreon,
	SiPnpm,
	SiPostgresql,
	SiPython,
	SiReact,
	SiReactquery,
	SiRedis,
	SiResend,
	SiRoblox,
	SiRust,
	SiStripe,
	SiTailwindcss,
	SiTauri,
	SiTokio,
	SiTypescript,
	SiVite,
} from "react-icons/si";

export const SKILL_GROUPS = ["Languages", "Frontend & desktop", "Backend & APIs", "Data", "DevOps & tools", "Discord & Roblox"] as const;

export type SkillGroup = (typeof SKILL_GROUPS)[number];

/** Brand colours from Simple Icons; black brand marks have none and take the text colour instead. */
export interface Tech {
	group: SkillGroup;
	icon: IconType;
	color?: string;
	colorOnDark?: string;
	colorOnLight?: string;
}

// ? Every technology here is listed under Skills, so anything on a project card shows up there too.
// ? Overrides nudge a brand colour just far enough to keep 3:1 contrast on that scheme's cards.
export const TECH = {
	TypeScript: { group: "Languages", icon: SiTypescript, color: "#3178c6" },
	JavaScript: { group: "Languages", icon: SiJavascript, color: "#f7df1e", colorOnLight: "#a59514" },
	Rust: { group: "Languages", icon: SiRust },
	"Lua / Luau": { group: "Languages", icon: SiLuau, color: "#00a2ff", colorOnLight: "#009af2" },
	Python: { group: "Languages", icon: SiPython, color: "#3776ab" },
	SQL: { group: "Languages", icon: LuDatabase },

	React: { group: "Frontend & desktop", icon: SiReact, color: "#61dafb", colorOnLight: "#479fb7" },
	Vite: { group: "Frontend & desktop", icon: SiVite, color: "#9135ff" },
	"TanStack Query": { group: "Frontend & desktop", icon: SiReactquery, color: "#ff4154" },
	"Material UI": { group: "Frontend & desktop", icon: SiMui, color: "#007fff" },
	Mantine: { group: "Frontend & desktop", icon: SiMantine, color: "#339af0", colorOnLight: "#3298ee" },
	"Tailwind CSS": { group: "Frontend & desktop", icon: SiTailwindcss, color: "#06b6d4", colorOnLight: "#05a2bd" },
	Tauri: { group: "Frontend & desktop", icon: SiTauri, color: "#24c8d8", colorOnLight: "#1da2af" },
	"HTML / CSS": { group: "Frontend & desktop", icon: SiHtml5, color: "#e34f26" },

	"Node.js": { group: "Backend & APIs", icon: SiNodedotjs, color: "#5fa04e" },
	Hono: { group: "Backend & APIs", icon: SiHono, color: "#e36002" },
	Express: { group: "Backend & APIs", icon: SiExpress },
	Axum: { group: "Backend & APIs", icon: LuServer },
	Tokio: { group: "Backend & APIs", icon: SiTokio },
	REST: { group: "Backend & APIs", icon: LuGlobe },
	Webhooks: { group: "Backend & APIs", icon: LuWebhook },
	Stripe: { group: "Backend & APIs", icon: SiStripe, color: "#635bff" },
	"Patreon API": { group: "Backend & APIs", icon: SiPatreon },
	Resend: { group: "Backend & APIs", icon: SiResend },

	PostgreSQL: { group: "Data", icon: SiPostgresql, color: "#4169e1" },
	Kysely: { group: "Data", icon: LuDatabaseZap },
	Redis: { group: "Data", icon: SiRedis, color: "#ff4438" },
	MongoDB: { group: "Data", icon: SiMongodb, color: "#47a248" },

	Docker: { group: "DevOps & tools", icon: SiDocker, color: "#2496ed" },
	"Cloudflare Workers": { group: "DevOps & tools", icon: SiCloudflareworkers, color: "#f38020", colorOnLight: "#e2771e" },
	"Cloudflare R2": { group: "DevOps & tools", icon: SiCloudflare, color: "#f38020", colorOnLight: "#e2771e" },
	"Linux (Ubuntu / Fedora)": { group: "DevOps & tools", icon: SiLinux, color: "#fcc624", colorOnLight: "#b58f1a" },
	"GitHub Actions": { group: "DevOps & tools", icon: SiGithubactions, color: "#2088ff" },
	pnpm: { group: "DevOps & tools", icon: SiPnpm, color: "#f69220", colorOnLight: "#d67f1c" },
	"Git / GitHub": { group: "DevOps & tools", icon: SiGit, color: "#f03c2e" },
	FFmpeg: { group: "DevOps & tools", icon: SiFfmpeg, color: "#007808" },

	"discord.js": { group: "Discord & Roblox", icon: SiDiscorddotjs, color: "#5865f2" },
	"roblox-ts": { group: "Discord & Roblox", icon: SiRoblox },
	Flamework: { group: "Discord & Roblox", icon: LuFlame },
	Rojo: { group: "Discord & Roblox", icon: LuFolderSync },
} satisfies Record<string, Tech>;

export type TechName = keyof typeof TECH;

/**
 * Technologies in one skill group, in registry order.
 * @param group Skill group to list.
 * @returns Names of the technologies in that group.
 */
export function techInGroup(group: SkillGroup): TechName[] {
	return (Object.keys(TECH) as TechName[]).filter((name) => TECH[name].group === group);
}
