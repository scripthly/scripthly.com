import { Box, Skeleton, Typography } from "@mui/material";
import { ROBLOX_GAMES } from "@scripthly/shared/roblox-games";
import LiveDot from "../../../components/live-dot";
import { ROBLOX_PROJECT } from "../../../content/profile";
import { useRobloxGames } from "../../../hooks/use-roblox-games";
import { formatCompact, formatCount } from "../../../util/format";
import ProjectCard from "./project-card";

/**
 * The four game icons as a 2×2 tile, sized like the other cards' logos.
 * @returns 44px mosaic.
 */
function GameMosaic() {
	return (
		<Box aria-hidden sx={{ display: "grid", gridTemplateColumns: "repeat(2, 21px)", gap: "2px", flexShrink: 0 }}>
			{ROBLOX_GAMES.map((game) => (
				<Box key={game.placeId} component="img" src={game.image} alt="" width={21} height={21} sx={{ borderRadius: "5px" }} />
			))}
		</Box>
	);
}

/**
 * Work card for the Roblox games with live portfolio totals, linking to the games page.
 * @returns List item card.
 */
function RobloxCard() {
	const { data, isPending, isError } = useRobloxGames();

	return (
		<ProjectCard project={ROBLOX_PROJECT} mark={<GameMosaic />}>
			{isError ? null : isPending ? (
				<Skeleton variant="text" width="70%" />
			) : (
				<Typography variant="body2" sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 0.5 }}>
					<Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
						<LiveDot active={data.totals.playing > 0} />
						{formatCount(data.totals.playing)} playing now
					</Box>

					<Box component="span" sx={{ color: "text.secondary" }}>
						{formatCompact(data.totals.visits)} visits
					</Box>
				</Typography>
			)}
		</ProjectCard>
	);
}

export default RobloxCard;
