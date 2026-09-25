import { PROFILE } from "../../content/profile";
import { usePageTitle } from "../../hooks/use-page-title";
import ContactSection from "./sections/contact-section";
import EducationSection from "./sections/education-section";
import HeroSection from "./sections/hero-section";
import SkillsSection from "./sections/skills-section";
import WorkSection from "./sections/work-section";

/**
 * About page: introduction, selected work, skills, education and contact.
 * @returns Home page.
 */
function HomePage() {
	usePageTitle(PROFILE.name);

	return (
		<>
			<HeroSection />
			<WorkSection />
			<SkillsSection />
			<EducationSection />
			<ContactSection />
		</>
	);
}

export default HomePage;
