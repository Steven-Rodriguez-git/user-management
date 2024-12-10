import express, { request, response } from "express";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.get("/", request, (response) => {
  response.send("Hello World");
});
