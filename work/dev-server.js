const { createServer } = require("next");
const path = require("path");

const dir = path.resolve(__dirname, "..", "outputs", "latte-site-next");
const port = 3000;

async function start() {
  const app = createServer({ dev: true, dir, port, hostname: "localhost" });
  await app.prepare();
  console.log(`> Ready on http://localhost:${port}`);
}

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
