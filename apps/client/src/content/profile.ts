import type { IconType } from "react-icons";
import { LuGraduationCap, LuLanguages, LuMail, LuMonitorSmartphone, LuShieldCheck } from "react-icons/lu";
import { SiDiscord, SiGithub, SiRoblox } from "react-icons/si";
import type { TechName } from "./tech";

export interface Project {
	name: string;
	role: string;
	period: string;
	summary: string;
	stack: TechName[];
	href?: string;
	logo?: string;
	icon?: IconType;
}

export interface EducationGroup {
	label: string;
	icon: IconType;
	items: { title: string; detail?: string }[];
}

export interface SocialLink {
	label: string;
	href: string;
	icon: IconType;
}

export const PROFILE = {
	name: "Callum Dobson",
	handle: "scripthly",
	location: "United Kingdom",
	employment: "Self-employed, working remotely",
	email: "hello@scripthly.com",
	github: "https://github.com/scripthly",
	headline: "Full-stack software engineer building web apps, Discord bots, desktop tools and the backends behind them.",
	summary: "12+ years across web, desktop and games, mostly in TypeScript, Rust, React and Node. I like owning the full path from data model to deployment.",
};

export const PROJECTS: Project[] = [
	{
		name: "Soundly",
		role: "Lead developer & maintainer",
		period: "2026 – Present",
		href: "https://soundly.bot",
		logo: "/images/projects/soundly.svg",
		summary: "Discord music bot for Spotify, Apple Music, Deezer, Tidal, SoundCloud and YouTube links, with shared playlists and a web dashboard.",
		stack: ["TypeScript", "discord.js", "Hono", "React", "PostgreSQL", "Redis", "FFmpeg", "Docker"],
	},
	{
		name: "Emotely",
		role: "Lead developer & maintainer",
		period: "2021 – Present",
		href: "https://emotely.bot",
		logo: "/images/projects/emotely.svg",
		summary: "Discord bot for managing emojis, stickers and role icons, with thousands of daily users and Stripe-billed Premium subscriptions.",
		stack: ["TypeScript", "discord.js", "Node.js", "PostgreSQL", "Kysely", "Stripe"],
	},
	{
		name: "Rolink",
		role: "Lead developer & maintainer",
		period: "2019 – 2025",
		logo: "/images/projects/rolink.webp",
		summary: "Discord bot that links Roblox accounts, syncs group ranks to roles and shows profiles, used by thousands of people daily.",
		stack: ["TypeScript", "discord.js", "Node.js", "MongoDB", "Patreon API"],
	},
	{
		name: "Genesis Performing Arts",
		role: "Web developer",
		period: "2026",
		href: "https://genesisperformingarts.co.uk",
		logo: "/images/projects/genesis.webp",
		summary: "Website for a dance school in Worthing, with classes, timetable, faculty pages and a contact form.",
		stack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Cloudflare Workers", "Cloudflare R2", "Resend"],
	},
	{
		name: "Private desktop & web",
		role: "Full-stack developer",
		period: "2023 – Present",
		icon: LuMonitorSmartphone,
		summary: "Cross-platform desktop apps, the Docker backends behind them, and workers that sync data and cut admin work.",
		stack: ["TypeScript", "React", "Tauri", "Rust", "Docker"],
	},
];

export const ROBLOX_PROJECT: Project = {
	name: "Roblox games",
	role: "Game & gameplay developer",
	period: "2013 – 2026",
	href: "/games",
	summary: "Client-server gameplay, UI and multiplayer networking, owned from design through live updates on PC, mobile and console.",
	stack: ["TypeScript", "roblox-ts", "Flamework", "Rojo", "Lua / Luau"],
};

export const EDUCATION: EducationGroup[] = [
	{
		label: "Qualifications",
		icon: LuGraduationCap,
		items: [
			{ title: "GCSEs", detail: "4 at grade C or above, including Maths and English" },
			{ title: "Level 1 & 2 Diploma", detail: "Electrical Installations" },
		],
	},
	{
		label: "Training",
		icon: LuShieldCheck,
		items: [{ title: "Workplace Health & Safety" }, { title: "Manual Handling" }, { title: "COSHH Awareness" }, { title: "Food Safety & Basic Hygiene" }],
	},
	{
		label: "Languages",
		icon: LuLanguages,
		items: [{ title: "English", detail: "Native" }],
	},
];

export const SOCIAL_LINKS: SocialLink[] = [
	{ label: "GitHub", href: PROFILE.github, icon: SiGithub },
	{ label: "Roblox", href: "https://www.roblox.com/users/2444896149/profile", icon: SiRoblox },
	{ label: "Discord", href: "https://discord.com/users/592185176033984542", icon: SiDiscord },
	{ label: "Email", href: `mailto:${PROFILE.email}`, icon: LuMail },
];

export const GAMES_INTRO =
	"I have been making Roblox games since 2013. These are the public experiences I co-founded and led programming on, all written in TypeScript with roblox-ts.";

export const GAMES_ALSO_HANDLED = "Game design, project management, monetization, marketing (including icons and store art) and advertising.";
