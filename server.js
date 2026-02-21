import express from "express";
import cors from "cors";
import yts from "yt-search";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Echo Server Running ✅");
});

/*
=====================
SEARCH REAL SONGS
=====================
*/
app.get("/search", async (req, res) => {
  const q = req.query.q;

  const result = await yts(q);

  const songs = result.videos.slice(0, 10).map(v => ({
    id: v.videoId,
    title: v.title
  }));

  res.json(songs);
});

/*
=====================
STREAM (TEMP DEMO)
=====================
*/
app.get("/stream/:id", (req, res) => {
  res.json({
    title: "Streaming",
    url:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("✅ Server running on", PORT)
);
