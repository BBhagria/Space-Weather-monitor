require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;

app.use(cors({
  origin: 'https://nasa-explorer-dash-2d9t.vercel.app' // replace with your actual Vercel domain
}));

app.get('/apod', async (req, res) => {
  const { date } = req.query;

  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: NASA_API_KEY,
        date: date // optional — if not passed, NASA returns today’s image
      }
    });
    console.log('NASA API response received');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from NASA API',error.message);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

app.get('/donki', async (req, res) => {
  const { eventType, startDate, endDate } = req.query;

  if (!eventType || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required query parameters: eventType, startDate, endDate' });
  }

  try {
    const response = await axios.get(`https://api.nasa.gov/DONKI/${eventType}`, {
      params: {
        startDate,
        endDate,
        api_key: NASA_API_KEY,
      },
    });

    console.log(`Fetched ${response.data.length} events from DONKI`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching DONKI data:', error.message);
    res.status(500).json({ error: 'Failed to fetch DONKI data' });
  }
});

app.get('/neo/feed', async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        api_key: process.env.NASA_API_KEY,
        start_date,
        end_date
      }
    });

    console.log('NASA NEO Feed data fetched');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NEO Feed data:', error.message);
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

app.get('/neo/lookup/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}`, {
      params: { api_key: process.env.NASA_API_KEY }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NEO lookup data:', error.message);
    res.status(500).json({ error: 'Failed to fetch asteroid data' });
  }
});

app.get('/neo/browse', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse', {
      params: {
        api_key: process.env.NASA_API_KEY,
        page: req.query.page || 0, // optional pagination
        size: req.query.size || 20
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NEO browse data:', error.message);
    res.status(500).json({ error: 'Failed to fetch NEO browse data' });
  }
});

app.get('/neo/speeds', async (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Missing start_date or end_date' });
  }

  try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        api_key: NASA_API_KEY,
        start_date,
        end_date
      }
    });

    const rawData = response.data.near_earth_objects;

    const speedData = [];

    Object.entries(rawData).forEach(([date, asteroids]) => {
      asteroids.forEach((asteroid) => {
        const approach = asteroid.close_approach_data?.[0];
        if (approach) {
          speedData.push({
            name: asteroid.name,
            date: approach.close_approach_date,
            speed_kph: parseFloat(approach.relative_velocity.kilometers_per_hour)
          });
        }
      });
    });

    res.json(speedData);
  } catch (error) {
    console.error('Error fetching NEO speed data:', error.message);
    res.status(500).json({ error: 'Failed to fetch asteroid speed data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
