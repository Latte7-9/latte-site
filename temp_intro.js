const fs = require("fs");
const p = "C:/Users/xqy07/Documents/Codex/Workspace/Project_001_个人网站搭建/js/intro.js";
let c = fs.readFileSync(p, "utf-8");
c = c.replace(
  /if \(typeof initGridBackground === "function"\) initGridBackground\(\);/,
  'if (typeof initGridBackground === "function") initGridBackground();\n      setTimeout(function() { if (typeof triggerVinylEntrance === "function") triggerVinylEntrance(); }, 300);'
);
fs.writeFileSync(p, c);
console.log("done:", /triggerVinylEntrance/.test(c));
