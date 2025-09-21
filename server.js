// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let tokenCache = { access_token: null, expires_at: 0 };

async function getAccessToken() {
  const now = Date.now();
  if (tokenCache.access_token && tokenCache.expires_at > now + 5000) {
    return tokenCache.access_token;
  }
  const creds = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  const data = await res.json();
  tokenCache.access_token = data.access_token;
  tokenCache.expires_at = Date.now() + data.expires_in * 1000;
  return tokenCache.access_token;
}

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "missing query" });

  try {
    const token = await getAccessToken();
    const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await r.json();
    const items = data.tracks?.items?.map(t => ({
      id: t.id,
      name: t.name,
      artists: t.artists.map(a => a.name)
    })) || [];
    res.json({ items });
  } catch (e) {
    res.status(500).json({ error: "server error", message: e.message });
  }
});

app.use(express.static(".")); // щоб твій index.html теж віддавався

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
