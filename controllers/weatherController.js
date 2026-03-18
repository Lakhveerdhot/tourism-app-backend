const axios = require('axios');

exports.getWeather = async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lng}`
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};