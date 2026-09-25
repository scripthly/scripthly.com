import type { RobloxGamesResponse, RobloxGameStats } from "@scripthly/shared/roblox-games";
import { useQuery } from "@tanstack/react-query";

const REFRESH_MS = 60_000;

export interface RobloxTotals {
	visits: number;
	playing: number;
	favorites: number;
}

/**
 * Indexes the stats by place ID and sums them across the portfolio.
 * @param data Response from `/api/roblox/games`.
 * @returns Stats keyed by place ID, plus totals.
 */
function selectGames(data: RobloxGamesResponse) {
	const byPlace = new Map<number, RobloxGameStats>(data.games.map((game) => [game.placeId, game]));
	const totals = data.games.reduce<RobloxTotals>(
		(sum, game) => ({ visits: sum.visits + game.visits, playing: sum.playing + game.playing, favorites: sum.favorites + game.favorites }),
		{ visits: 0, playing: 0, favorites: 0 },
	);

	return { byPlace, totals };
}

/**
 * Live stats for every portfolio game, refreshed each minute while the tab is visible.
 * @returns Query result with stats keyed by place ID and portfolio totals.
 */
export function useRobloxGames() {
	return useQuery({
		queryKey: ["roblox-games"],
		staleTime: REFRESH_MS,
		refetchInterval: REFRESH_MS,
		queryFn: async ({ signal }) => {
			const response = await fetch("/api/roblox/games", { signal });
			if (!response.ok) throw new Error(`Roblox stats request failed with ${response.status}`);

			return (await response.json()) as RobloxGamesResponse;
		},
		select: selectGames,
	});
}
