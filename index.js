const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3666;

app.use(cors());

const truismsDir = path.join(__dirname, "truisms");
const truisms = Object.fromEntries(
  fs
    .readdirSync(truismsDir)
    .filter((f) => f.endsWith(".txt"))
    .map((f) => [
      path.basename(f, ".txt"),
      fs
        .readFileSync(path.join(truismsDir, f), "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
    ])
);

function sample(list, n) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

app.get("/truisms/:type/:number?", (req, res) => {
  const { type, number } = req.params;
  const list = truisms[type] || truisms.jh;
  const n = Math.min(Math.max(parseInt(number) || 1, 1), 100);
  res.json({ truisms: sample(list, n) });
});

app.get("/airbnb", (req, res) => {
  const list = truisms.airbnb;
  const randomTruism = list[Math.floor(Math.random() * list.length)];
  res.json({ truism: randomTruism });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
