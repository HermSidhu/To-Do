const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/weather/:latlon', async (request, response) => {
  const latlon = request.params.latlon.split(',');
  const lat = latlon[0];
  const lon = latlon[1];
  const api_key = process.env.API_KEY;
  const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const data = weather_data

  response.json(data);
});
