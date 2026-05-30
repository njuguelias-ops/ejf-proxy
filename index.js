const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const API_KEY = 'cf52dcbf4ce341e08b3de0867e30d12d';
const BASE = 'https://api.football-data.org/v4';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/*', async (req, res) => {
  const path2 = req.params[0];
  const query = new URLSearchParams(req.query).toString();
  const url = `${BASE}/${path2}${query ? '?' + query : ''}`;
  try {
    const r = await fetch(url, { headers: { 'X-Auth-Token': API_KEY } });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
