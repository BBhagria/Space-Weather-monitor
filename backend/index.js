require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;

app.use(cors());

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
