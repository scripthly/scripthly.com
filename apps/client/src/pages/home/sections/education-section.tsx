import { Box, Paper, Typography } from "@mui/material";
import Section from "../../../components/section";
import { EDUCATION } from "../../../content/profile";

/**
 * Qualifications, training and languages as three columns of one panel.
 * @returns Education section.
 */
function EducationSection() {
	return (
		<Section id="education" title="Education & training">
			<Paper sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" } }}>
				{EDUCATION.map(({ label, icon: Icon, items }) => (
					<Box key={label} sx={{ p: { xs: 2.5, md: 3 }, "& + &": { borderStyle: "solid", borderColor: "divider", borderWidth: { xs: "1px 0 0", md: "0 0 0 1px" } } }}>
						<Typography variant="body2" component="h3" sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontWeight: 500 }}>
							<Box component="span" sx={{ display: "inline-flex", color: "primary.main" }}>
								<Icon aria-hidden size={18} />
							</Box>

							{label}
						</Typography>

						<Box component="ul" sx={{ display: "grid", rowGap: 1.75, m: 0, mt: 2, p: 0, listStyle: "none" }}>
							{items.map((item) => (
								<li key={item.title}>
									<Typography variant="body2" sx={{ fontWeight: 500 }}>
										{item.title}
									</Typography>

									{item.detail ? (
										<Typography variant="meta" color="text.secondary">
											{item.detail}
										</Typography>
									) : null}
								</li>
							))}
						</Box>
					</Box>
				))}
			</Paper>
		</Section>
	);
}

export default EducationSection;
