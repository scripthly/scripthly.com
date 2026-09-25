import { Box, Skeleton, Typography } from "@mui/material";
import type { RobloxGameStats } from "@scripthly/shared/roblox-games";
import LiveDot from "../../../components/live-dot";
import { formatCompact, formatCount } from "../../../util/format";

type GameFiguresProps = {
	stats?: RobloxGameStats;
	loading: boolean;
};

type FigureProps = {
	label: string;
	children: React.ReactNode;
};

/**
 * One labelled number in the figures row.
 * @param label What the number counts.
 * @param children The number, or a skeleton while it loads.
 * @returns Figure block.
 */
function Figure({ label, children }: FigureProps) {
	return (
		<Box>
			<Typography component="p" sx={{ display: "flex", alignItems: "center", gap: 0.75, fontSize: "1.0625rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
				{children}
			</Typography>

			<Typography variant="meta" color="text.secondary">
				{label}
			</Typography>
		</Box>
	);
}

/**
 * Visits, favourites and live players for one game.
 * @param stats Live stats, once loaded.
 * @param loading Whether stats are still on their way.
 * @returns Figures row, or nothing when stats failed to load.
 */
function GameFigures({ stats, loading }: GameFiguresProps) {
	if (!loading && !stats) return null;

	return (
		<Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(3, max-content)", md: "repeat(3, 84px)" }, columnGap: { xs: 4, md: 2 } }}>
			<Figure label="Visits">{stats ? formatCompact(stats.visits) : <Skeleton width={48} />}</Figure>
			<Figure label="Favourites">{stats ? formatCompact(stats.favorites) : <Skeleton width={48} />}</Figure>

			<Figure label="Playing now">
				{stats ? (
					<>
						<LiveDot active={stats.playing > 0} />
						{formatCount(stats.playing)}
					</>
				) : (
					<Skeleton width={32} />
				)}
			</Figure>
		</Box>
	);
}

export default GameFigures;
