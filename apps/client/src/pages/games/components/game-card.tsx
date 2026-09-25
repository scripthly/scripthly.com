import { Box, Button, Collapse, Paper, Typography } from "@mui/material";
import { type RobloxGame, type RobloxGameStats, robloxGameUrl } from "@scripthly/shared/roblox-games";
import { useId, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import SmartLink from "../../../components/smart-link";
import { GAMES_ALSO_HANDLED } from "../../../content/profile";
import GameFigures from "./game-figures";

type GameCardProps = {
	game: RobloxGame;
	stats?: RobloxGameStats;
	loading: boolean;
};

/**
 * One game: its icon, what it is, live figures, and a panel that expands into what I did on it.
 * @param game Portfolio entry.
 * @param stats Live stats, once loaded.
 * @param loading Whether stats are still on their way.
 * @returns List item card.
 */
function GameCard({ game, stats, loading }: GameCardProps) {
	const [open, setOpen] = useState(false);
	const detailsId = useId();

	return (
		<Paper
			component="li"
			sx={{
				display: "grid",
				gridTemplateColumns: { xs: "64px minmax(0, 1fr)", md: "104px minmax(0, 1fr) auto" },
				gridTemplateAreas: { xs: '"icon head" "figures figures" "body body"', md: '"icon head figures" "icon body body"' },
				columnGap: { xs: 2, md: 3 },
				alignItems: "start",
				p: { xs: 2.5, md: 3 },
			}}
		>
			<Box component="img" src={game.image} alt="" width={104} height={104} sx={{ gridArea: "icon", width: "100%", height: "auto", borderRadius: { xs: 2, md: 3 } }} />

			<Box sx={{ gridArea: "head", minWidth: 0 }}>
				<Typography variant="h3" component="h2">
					{game.title}
				</Typography>

				{stats ? (
					<Typography variant="meta" color="text.secondary">
						Launched {new Date(stats.createdAt).getFullYear()}
					</Typography>
				) : null}

				<Typography variant="body2" sx={{ mt: 1.25, maxWidth: 600 }}>
					{game.summary}
				</Typography>
			</Box>

			<Box sx={{ gridArea: "figures", mt: { xs: 2.5, md: 0.5 } }}>
				<GameFigures stats={stats} loading={loading} />
			</Box>

			<Box sx={{ gridArea: "body", minWidth: 0 }}>
				<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2.5, mt: 2.5 }}>
					<Button
						variant="outlined"
						onClick={() => setOpen((value) => !value)}
						aria-expanded={open}
						aria-controls={detailsId}
						endIcon={<LuChevronDown aria-hidden style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />}
					>
						What I did
					</Button>

					<SmartLink href={robloxGameUrl(game.placeId)} variant="body2" sx={{ fontWeight: 500 }}>
						Play on Roblox
					</SmartLink>
				</Box>

				<Collapse in={open} id={detailsId}>
					<Box sx={{ maxWidth: 640, mt: 3, pt: 2.5, borderTop: 1, borderColor: "divider" }}>
						{game.highlights.length > 0 ? (
							<Box component="ul" sx={{ m: 0, mb: 2, pl: 2.5, "& li::marker": { color: "primary.main" } }}>
								{game.highlights.map((highlight) => (
									<Typography key={highlight} component="li" variant="body2" sx={{ "& + &": { mt: 0.75 } }}>
										{highlight}
									</Typography>
								))}
							</Box>
						) : null}

						<Typography variant="body2" color="text.secondary">
							<Box component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
								Also handled:{" "}
							</Box>
							{GAMES_ALSO_HANDLED}
						</Typography>
					</Box>
				</Collapse>
			</Box>
		</Paper>
	);
}

export default GameCard;
