import { Box, Typography } from "@mui/material";
import { ROBLOX_GAMES } from "@scripthly/shared/roblox-games";
import LiveDot from "../../components/live-dot";
import PageHeader from "../../components/page-header";
import { GAMES_INTRO } from "../../content/profile";
import { usePageTitle } from "../../hooks/use-page-title";
import { useRobloxGames } from "../../hooks/use-roblox-games";
import { formatCompact, formatCount } from "../../util/format";
import GameCard from "./components/game-card";

/**
 * Roblox portfolio: a short intro with live totals, then one expandable card per game.
 * @returns Games page.
 */
function GamesPage() {
	usePageTitle("Roblox games");

	const { data, isPending } = useRobloxGames();

	return (
		<>
			<PageHeader title="Roblox games">
				<Typography variant="body1" color="text.secondary">
					{GAMES_INTRO}
				</Typography>

				{data ? (
					<Typography variant="body1" sx={{ mt: 2 }}>
						<Box component="span" sx={{ display: "inline-flex", verticalAlign: "middle", mr: 1 }}>
							<LiveDot active={data.totals.playing > 0} />
						</Box>
						{formatCount(data.totals.playing)} {data.totals.playing === 1 ? "person" : "people"} playing right now, with {formatCompact(data.totals.visits)} visits and{" "}
						{formatCompact(data.totals.favorites)} favourites across all {ROBLOX_GAMES.length} games.
					</Typography>
				) : null}
			</PageHeader>

			<Box component="ul" sx={{ display: "grid", gap: 2.5, m: 0, p: 0, listStyle: "none" }}>
				{ROBLOX_GAMES.map((game) => (
					<GameCard key={game.placeId} game={game} stats={data?.byPlace.get(game.placeId)} loading={isPending} />
				))}
			</Box>
		</>
	);
}

export default GamesPage;
