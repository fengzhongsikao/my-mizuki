import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(
	__dirname,
	"../node_modules/code-points/dist/code-points-cjs.js",
);

if (!fs.existsSync(filePath)) {
	console.log("ℹ code-points not found, skipping patch");
	process.exit(0);
}

const content = fs.readFileSync(filePath, "utf-8");
const targetLine = "var codePoint = require('code-point');";

if (content.includes(targetLine)) {
	const patched = content.replace(
		targetLine,
		`var _codePoint = require('code-point');
var codePoint = typeof _codePoint === 'function' ? _codePoint : _codePoint.default;`,
	);
	fs.writeFileSync(filePath, patched, "utf-8");
	console.log("✓ Patched code-points for Bun compatibility");
} else if (content.includes("typeof _codePoint")) {
	console.log("ℹ code-points already patched, skipping");
} else {
	console.log("ℹ code-points file format unexpected, manual check may be needed");
}
