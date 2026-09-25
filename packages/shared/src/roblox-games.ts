export interface RobloxGame {
	placeId: number;
	title: string;
	image: string;
	summary: string;
	highlights: string[];
}

export interface RobloxGameStats {
	placeId: number;
	visits: number;
	playing: number;
	favorites: number;
	createdAt: string;
}

export interface RobloxGamesResponse {
	games: RobloxGameStats[];
	updatedAt: string;
}

/** Portfolio games in display order. The server only fetches stats for these. */
export const ROBLOX_GAMES: RobloxGame[] = [
	{
		placeId: 2609668898,
		title: "Custom Duels",
		image: "/images/games/custom-duels.webp",
		summary: "A pad-based sword fighting game with coins, unlockable effects, daily tournaments and minigames.",
		highlights: ["Led hiring and grew the team."],
	},
	{
		placeId: 109196497570274,
		title: "Don't Wake the Lions",
		image: "/images/games/dont-wake-the-lions.webp",
		summary: "Sneak past sleeping lions to steal their animals, then run for it when they wake up and give chase.",
		highlights: [
			"Built the steal-and-carry loop, where rarer animals slow you down.",
			"Made limited-edition items that stay in sync across every server.",
			"Added offline earnings, daily and playtime rewards, a prize wheel and gifting.",
			"Set up onboarding analytics to see where new players drop off.",
		],
	},
	{
		placeId: 124598008269983,
		title: "Steal a Monkey",
		image: "/images/games/steal-a-monkey.webp",
		summary: "Collect monkeys that earn bananas, defend your base, and raid other players' bases for rare monkeys.",
		highlights: [],
	},
	{
		placeId: 79096061417565,
		title: "+1 Speed vs Brainrots",
		image: "/images/games/speed-vs-brainrots.webp",
		summary: "Every step makes you faster. Outrun the giant brainrots charging at you and escape before they catch you.",
		highlights: [
			"Built the speed progression: treadmills, trails and rebirths.",
			"Programmed the brainrot enemies, with speed tiers tuned to the player's own speed curve.",
			"Added revives and a VIP area as a developer product and a game pass.",
			"Set up onboarding analytics to see where new players drop off.",
		],
	},
];

/**
 * Public Roblox page for a place; Roblox redirects it to the slugged URL.
 * @param placeId Roblox place ID.
 * @returns Game page URL.
 */
export function robloxGameUrl(placeId: number): string {
	return `https://www.roblox.com/games/${placeId}`;
}
