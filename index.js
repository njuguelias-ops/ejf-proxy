const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_KEY = '7de8ef3b5af5d2166dd72a2e956e0026';
const BASE = 'https://v3.football.api-sports.io';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/*', async (req, res) => {
  const path = req.params[0];
  const query = new URLSearchParams(req.query).toString();
  const url = `${BASE}/${path}${query ? '?' + query : ''}`;
  try {
    const r = await fetch(url, { headers: { 'x-apisports-key': API_KEY } });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
