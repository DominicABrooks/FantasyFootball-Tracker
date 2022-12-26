const axios = require("axios");
require('dotenv').config();

const options = {
  method: 'GET',
  url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/2022',
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.RAPID_API_HOST
  }
};

module.exports = {
  getData: () => {
    // return promise from url
    return axios.request(options);
  }
}
