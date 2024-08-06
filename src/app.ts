import express from "express";
import { config } from "dotenv";

// load env variables
config();

const app = express();
const port = process.env.SERVER_PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
