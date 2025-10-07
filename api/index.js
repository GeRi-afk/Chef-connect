const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

module.exports = app;
module.exports.handler = serverless(app);
