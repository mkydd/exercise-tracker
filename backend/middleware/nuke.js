const axios = require("axios");
const User = require("../models/User");
const Workout = require("../models/Workout");

const getAccessToken = async () => {
  const options = {
    method: "POST",
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    },
  };

  try {
    const response = await axios.request(options);
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response.data || error.message
    );
    return null;
  }
};

// Function to get all users
const getUsers = async () => {
  const token = await getAccessToken();

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("data =", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response.data || error.message
    );
    return [];
  }
};

// Function to delete a user by user_id
const deleteUser = async (userId) => {
  const token = await getAccessToken();

  try {
    const response = await axios.delete(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Deleted user ${userId}: ${response.status}`);
    return true;
  } catch (error) {
    console.error(
      `Error deleting user ${userId}:`,
      error.response.data || error.message
    );
    return false;
  }
};

// Main function to delete all users
const deleteAllUsers = async () => {
  const users = await getUsers();

  for (const user of users) {
    const deletedUser = await deleteUser(user.user_id);

    if (!deletedUser) {
      return false;
    }
  }

  return true;
};

const clearDatabase = async () => {
  await User.deleteMany({});
  await Workout.deleteMany({});

  const getUsers = await User.find({});
  const getWorkouts = await Workout.find({});

  if (getUsers.length > 0 || getWorkouts.length > 0) {
    return false;
  }

  return true;
};

// Run the deletion process
async function nuke() {
  const auth0Nuked = await deleteAllUsers();
  const dbNuked = await clearDatabase();
  return { auth0Nuked, dbNuked };
}

module.exports = nuke;
