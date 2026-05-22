// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "暗雨冥的花田",
		imgurl: "https://dkrain.com/assets/home/home.webp",
		desc: "喵喵喵喵喵喵",
		siteurl: "https://dkrain.com/",
		tags: ["个人博客"],
	},	
	{
		id: 2,
		title: "atdunbg",
		imgurl: "https://atdunbg.github.io/_astro/demo-avatar.CxcI0ivM_1nbuVe.webp",
		desc: "一个又菜又爱学的技术小白",
		siteurl: "https://atdunbg.github.io/",
		tags: ["个人博客"],
	},{
		id: 3,
		title: "ElysiumStack",
		imgurl: "https://elysium-stack.cn/upload/c4d9cffe-2541-40d3-b8b9-85f5827a2dc3.png",
		desc: "不会摄影的设计师不是优秀的旅行家",
		siteurl: "https://elysium-stack.cn/",
		tags: ["个人博客"],
	},
	{
		id: 4,
		title: "番茄主理人",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=20447289&s=640",
		desc: "坐而言不如起而行.",
		siteurl: "https://fqzlr.com/",
		tags: ["个人博客"],
	},
	{
		id: 5,
		title: "QgxsのBlog",
		imgurl: "https://www.20210701.xyz/icon.jpeg",
		desc: "放松心情，漫游四处，处处美景。",
		siteurl: "https://www.20210701.xyz/",
		tags: ["个人博客"],
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
