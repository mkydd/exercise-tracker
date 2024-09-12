const axios = require('axios')
require('dotenv').config();
const { getAccessToken } = require('./auth0-getToken')

async function resendVerificationEmail(auth0Id) {
  const token = await getAccessToken();
  const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/jobs/verification-email`;

  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify({
        user_id: auth0Id
      }),
      url,
    });
    return res
  } catch (error) {
    return error
  }
}

module.exports = resendVerificationEmail;
