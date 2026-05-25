export interface Game {
	id: string;
	name: string;
	description: string;
	avator: string; // 头像URL地址，留空则显示首字母
	category: "pc" | "mobile" | "console" | "board" | "other";
	status: "playing" | "completed" | "planned" | "paused" | "dropped";
	platform: string[];
	releaseDate?: string;
	uid?: string;
	website?: string;
	color?: string;
}

export const gamesData: Game[] = [
	{
		id: "endfield",
		name: "明日方舟终末地",
		description:
			"跨越边境，直至前线。开拓区的一切等待你的探索。完成这份合约，前往潜力无限的新热土，离开我们熟悉的家园——开拓未知的新世界。",
		avator: "https://ts1.tc.mm.bing.net/th/id/OIP-C.6EiGZKQ16rDVRn02ZJxnKwAAAA?w=108&h=108&c=1&bgcl=5927d4&r=0&o=7&dpr=2&pid=ImgRC&rm=3",
		category: "mobile",
		status: "playing",
		platform: ["PC", "iOS", "Android", "PS5"],
		releaseDate: "2026-01-22",
		uid: "测试 uid",
		website: "https://endfield.hypergryph.com/",
		color: "#6B8FF3",
	},
	{
		id: "yihuan",
		name: "异环",
		description:
			"故事将从海特洛市启篇，作为首位“无证上岗”的“异象猎人”，玩家将扮演接取民间异象委托维持周转的古董店“伊波恩”的一员，与个性迥异、能力非凡的伙伴们一起探索各城市的大小谜团，历经有笑有泪的各式奇遇，演绎独属于异象猎人的都市物语 ",
		avator: "https://th.bing.com/th?id=OIF.zv1h%2fTR06%2bkRTweQgNDOtQ&rs=1&pid=ImgDetMain&o=7&rm=3",
		category: "mobile",
		status: "playing",
		platform: ["PC", "iOS", "Android", "PS5"],
		releaseDate: "2026-04-23",
		uid: "",
		website: "https://yh.wanmei.com/index.html",
		color: "#6B8FF3",
	},
	{
		id: "mingchao",
		name: "鸣潮",
		description:
			"游戏主打高自由度的动作战斗玩法与丰富多样的开放世界探索。玩家扮演一位在这个世界苏醒的漂泊者，将在找回记忆、寻找自我身份的同时结识无数的共鸣者同伴，并和伙伴一起踏上跨越悲鸣的旅途 ",
		avator: "https://tse4.mm.bing.net/th/id/OIP.SbZl8yQDeYg_p-MQQivX4AAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
		category: "mobile",
		status: "playing",
		platform: ["PC", "iOS", "Android", "PS5"],
		releaseDate: "2024-05-23",
		uid: "",
		website: "https://mc.kurogames.com/main",
		color: "#6B8FF3",
	},
	{
		id: "genshin-impact",
		name: "原神",
		description:
			"游戏剧情于虚构世界的提瓦特大陆上展开，该世界分成七个国家，每个国家分别以一种元素为主题，并由对应元素的神明所分管。游戏剧情的主角为“旅行者”，是一对在无数个世界中旅行的兄妹，因遭遇陌生神明阻拦在提瓦特被迫分离。玩家将扮演旅行者，为了寻找自己失散的唯一血亲，并与派蒙一同游历七国。",
		avator: "https://ts3.tc.mm.bing.net/th/id/OIP-C.-Ai_Gf1S7xh-Eh5WhFqqSQHaHa?w=108&h=108&c=1&bgcl=7ba07a&r=0&o=7&dpr=2&pid=ImgRC&rm=3",
		category: "mobile",
		status: "playing",
		platform: ["PC", "iOS", "Android", "PS5"],
		releaseDate: "2020-09-28",
		uid: "",
		website: "https://ys.mihoyo.com/",
		color: "#6B8FF3",
	},
	{
		id: "honkai-star-rail",
		name: "崩坏：星穹铁道",
		description:
			"《崩坏：星穹铁道》是由米哈游开发的战略角色扮演游戏，于2023年4月登陆Microsoft Windows、iOS、Android，同年10月登陆PlayStation 5。本作为继《FlyMe2theMoon》《崩坏学园》《崩坏学园2》《崩坏3》之后，崩坏系列的第5部作品。游戏融合了日式角色扮演游戏的元素，战斗系统采用回合制，并含有箱庭探索、Roguelike等机制。故事主要讲述了游戏主角“开拓者”登上“星穹列车”漫游宇宙中各大行星，并在冒险中解决“星核”对各世界带来的灾难。该作是免费游玩的服务型游戏，抽卡为主要收费模式。",
		avator: "https://ts4.tc.mm.bing.net/th/id/OIP-C.iRdNaW20C7Q2x1ws_fVkWQAAAA?w=108&h=108&c=1&bgcl=fad049&r=0&o=7&dpr=2&pid=ImgRC&rm=3",
		category: "mobile",
		status: "playing",
		platform: ["PC", "iOS", "Android"],
		releaseDate: "2023-04-26",
		uid: "",
		website: "https://sr.mihoyo.com/",
		color: "#4A90D9",
	},
];
