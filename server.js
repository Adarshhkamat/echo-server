import express from "express";
import cors from "cors";

const app = express();

/*
========================
MIDDLEWARE
========================
*/
app.use(cors());
app.use(express.json());

/*
========================
HEALTH CHECK (IMPORTANT)
========================
*/
app.get("/", (req, res) => {
  res.send("Echo Server Running ✅");
});

/*
========================
SEARCH ENDPOINT
========================
*/
app.get("/search", (req, res) => {
  const q = req.query.q || "";

  res.json([
    { id: "demo1", title: `Result for ${q}` },
    { id: "demo2", title: `Another ${q}` }
  ]);
});

/*
========================
STREAM ENDPOINT
========================
*/
app.get("/stream/:id", (req, res) => {
  res.json({
    title: "Demo Stream",
    url:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  });
});

/*
========================
✅ RENDER PORT FIX
========================
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
