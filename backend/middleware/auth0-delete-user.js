const { ManagementClient } = require('auth0');
require('dotenv').config();

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

async function deleteAuthUser(auth0UserId) {
  try {
    console.log('Attempting to delete auth0 user');
    await management.users.delete({ id: auth0UserId });
    console.log('Auth0 user deleted');
  } catch (err) {
    console.error('Failed to delete Auth0 user:', err);
  }
}

module.exports = deleteAuthUser;
