import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

//middlewars
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/`);
});

export default app;
