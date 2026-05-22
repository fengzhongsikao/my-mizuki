import fs from "fs/promises";
import path from "path";

const FRIENDS_DATA_PATH = path.join(import.meta.dir, "../src/data/friends.ts");

function parseArgs() {
	const args = process.argv.slice(2);
	const params = {};

	for (const arg of args) {
		if (arg.startsWith("--")) {
			const eqIndex = arg.indexOf("=");
			if (eqIndex === -1) continue;
			const key = arg.slice(2, eqIndex);
			const value = arg.slice(eqIndex + 1);
			params[key] = value;
		}
	}

	return params;
}

function escapeString(str) {
	return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function main() {
	const params = parseArgs();

	const title = params["title"];
	const siteurl = params["siteurl"];
	const imgurl = params["imgurl"];
	const desc = params["desc"];
	const tagsStr = params["tags"];

	if (!title || !siteurl || !imgurl || !desc || !tagsStr) {
		console.error(
			"Usage: bun scripts/add-friend.mjs --title=NAME --siteurl=URL --imgurl=URL --desc=DESC --tags=TAG1,TAG2",
		);
		console.error("All parameters are required.");
		process.exit(1);
	}

	const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

	const content = await fs.readFile(FRIENDS_DATA_PATH, "utf-8");

	const idMatch = content.match(/id:\s*(\d+)/g);
	let newId = 1;
	if (idMatch) {
		const ids = idMatch.map((m) => parseInt(m.match(/\d+/)[0], 10));
		newId = Math.max(...ids) + 1;
	}

	const newEntry = `	{
		id: ${newId},
		title: "${escapeString(title)}",
		imgurl: "${escapeString(imgurl)}",
		desc: "${escapeString(desc)}",
		siteurl: "${escapeString(siteurl)}",
		tags: [${tags.map((t) => `"${escapeString(t)}"`).join(", ")}],
	},
`;

	const insertMarker = "];\n\n// 获取所有友情链接数据";
	const insertIndex = content.lastIndexOf(insertMarker);

	if (insertIndex === -1) {
		console.error("Error: Could not find insertion point in friends.ts");
		process.exit(1);
	}

	const beforeList = content.slice(0, insertIndex);
	const afterList = content.slice(insertIndex);

	const updatedContent = beforeList + newEntry + afterList;

	await fs.writeFile(FRIENDS_DATA_PATH, updatedContent, "utf-8");
	console.log(`Successfully added friend "${title}" with ID ${newId}`);
}

main().catch((err) => {
	console.error("Error adding friend:", err);
	process.exit(1);
});
