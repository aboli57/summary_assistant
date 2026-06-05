import express from "express";
import cors from "cors";
import { loadEnv } from "./env";
import { askStructured } from "./ask-core";
loadEnv();
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { query } = req.body;
    if (typeof query !== "string" || query.trim() === "") {
      return res
        .status(400)
        .json({ error: "Query must be a non-empty string" });
    }
    const output = await askStructured(query);
    res.json(output);
  } catch (error) {
    console.error("Error handling /ask request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
