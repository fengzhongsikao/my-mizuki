// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}

export const projectsData: Project[] = [
	{
		id: "windstart",
		title: "风起诗词",
		description: "一个基于 nextjs 的诗词网站",
		image: "/assets/projects/windstart.png",
		category: "web",
		techStack: ["nextjs", "TypeScript", "Tailwind CSS", "shadcn-ui"],
		status: "completed",
		sourceCode: "https://github.com/LyraVoid/Mizuki",
		visitUrl: "https://windstart.top",
		startDate: "2026-05-19",
		endDate: "2026-05-19",
		featured: true,
		tags: ["Website", "Theme", "Open Source"],
	},
	{
		id: "windnote",
		title: "风起占卜",
		description: "一个基于 wails的占卜应用",
		image: "",
		category: "desktop",
		techStack: ["wails", "antd", "TypeScript", "deno", "go"],
		status: "completed",
		sourceCode: "https://github.com/fengzhongsikao/windnote",
		startDate: "2026-05-17",
		endDate: "2026-05-19",
		tags: ["wails", "Tool", "Desktop"],
		showImage: false,
	},
	{
		id: "windmusic",
		title: "风起音乐",
		description: "一个基于 Wails 的跨平台桌面音乐客户端",
		image: "",
		category: "desktop",
		techStack: ["Wails", "Go", "Svelte", "TypeScript", "Tailwind CSS"],
		status: "completed",
		sourceCode: "https://github.com/fengzhongsikao/windmusic",
		startDate: "2026-05-17",
		endDate: "2026-05-19",
		tags: ["Music", "Desktop", "Wails"],
		showImage: false,
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
