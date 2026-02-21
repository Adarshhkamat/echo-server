import express from "express";
import cors from "cors";
import yts from "yt-search";
import ytdl from "@distube/ytdl-core";

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
HEALTH CHECK
========================
*/
app.get("/", (req, res) => {
  res.send("Echo Server Running ✅");
});

/*
========================
SEARCH REAL SONGS
========================
*/
app.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const result = await yts(q);

    const songs = result.videos
      .slice(0, 10)
      .map(v => ({
        id: v.videoId,
        title: v.title
      }));

    res.json(songs);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

/*
========================
REAL AUDIO STREAM
========================
*/
app.get("/stream/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const videoUrl =
      `https://www.youtube.com/watch?v=${id}`;

    const info = await ytdl.getInfo(videoUrl);

    const format = ytdl.chooseFormat(
      info.formats,
      {
        quality: "highestaudio",
        filter: "audioonly"
      }
    );

    res.json({
      title: info.videoDetails.title,
      url: format.url
    });

  } catch (err) {
    console.error("STREAM ERROR:", err);

    res.status(500).json({
      error: "Stream extraction failed"
    });
  }
});

/*
========================
RENDER PORT FIX
========================
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});
