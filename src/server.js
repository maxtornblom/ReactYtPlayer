// server.js
const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.get("/search", (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "No search query provided" });

  // Increase maxBuffer size to handle larger outputs from yt-dlp
  exec(
    `yt-dlp "ytsearch10:${query}" --dump-json`,
    { maxBuffer: 1024 * 1024 * 10 }, // Increase buffer size to 10MB
    (error, stdout, stderr) => {
      if (error || stderr) {
        console.error("Error executing yt-dlp:", error || stderr);
        return res.status(500).json({ error: "Failed to retrieve videos" });
      }

      try {
        const videoData = stdout
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line))
          .map((item) => ({
            title: item.title,
            videoId: item.id,
          }));
        res.json(videoData);
      } catch (parseError) {
        console.error("Error parsing yt-dlp output:", parseError);
        res.status(500).json({ error: "Failed to parse video data" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
