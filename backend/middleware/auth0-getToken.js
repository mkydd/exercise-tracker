const axios = require('axios')
require('dotenv').config()

async function getAccessToken() {
  const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;;

  try {
    const res = await axios({
      url,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
    });
    return res.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
  }
}

module.exports = getAccessToken;