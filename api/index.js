const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Example routes
app.get("/api/v1/ping", (_req, res) => res.send("pong"));
app.post("/api/v1/echo", (req, res) => res.json({ youSent: req.body }));

module.exports = app;              // for local server use
module.exports.handler = serverless(app); // for Vercel serverless
