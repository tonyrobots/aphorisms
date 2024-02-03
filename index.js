const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// List of AI-generated aphorisms inspired by Jenny Holzer
const aphorisms = [
  "Change is the only constant.",
  "Fear is a natural reaction to moving closer to the truth.",
  "Art is a guarantee of sanity.",
  "Drink more Ovaltine.",
  "The future is stupid.",
  // Add more aphorisms here
];

// Endpoint to serve a random aphorism
app.get("/aphorism", (req, res) => {
  const randomIndex = Math.floor(Math.random() * aphorisms.length);
  const randomAphorism = aphorisms[randomIndex];
  res.json({ aphorism: randomAphorism });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
