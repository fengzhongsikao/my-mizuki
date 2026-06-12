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
	},
	{
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
	{
		id: 6,
		title: "atticus",
		imgurl: "https://www.atticus0723.top/avatar.png",
		desc: "探索空间数据与现代前端的交汇",
		siteurl: "https://www.atticus0723.top/",
		tags: ["个人博客"],
	},
	{
		id: 7,
		title: "upxuu",
		imgurl: "https://upxuu.com/images/20260214145619.jpg",
		desc: "逐光而上",
		siteurl: "https://upxuu.com/",
		tags: ["个人博客"],
	},
	{
		id: 8,
		title: "尺素",
		imgurl: "https://8872388.xyz/home/avatar.webp",
		desc: "生命绚烂，别被黑暗压垮",
		siteurl: "https://8872388.xyz/",
		tags: ["个人博客"],
	},
	{
		id: 9,
		title: "tianhw",
		imgurl: "https://image.tianhw.top/avatar.webp",
		desc: "前途似海，来日方长",
		siteurl: "https://blog.tianhw.top/",
		tags: ["个人博客"],
	},
	{
		id: 10,
		title: "北に向かう",
		imgurl: "https://ignorant.top/_astro/avatar.DT3z3YNN_TwrwT.webp",
		desc: "孩儿立志出乡关，学不成名誓不还",
		siteurl: "https://ignorant.top/",
		tags: ["个人博客"],
	},
	{
		id: 11,
		title: "辰渊尘站",
		imgurl: "https://blog.mcxiaochen.top/images/congyu/touxiang.webp",
		desc: "有志不在年高，无志空活百岁。",
		siteurl: "https://blog.mcxiaochen.top/",
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
