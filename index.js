import express, { request, response } from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (request, response) => {
  response.send("Hello Steven");
});

app.post("/login", (req, res) => {
  res.json({ user: "middleware" });
});
app.post("/register", (req, res) => {});
app.post("/logout", (req, res) => {});
app.post("/protected", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
