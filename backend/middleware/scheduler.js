const schedule = require("node-schedule");
const nukeMiddleware = require("./nuke");

async function myMidnightTask() {
  console.log("Executing Nuke!");

  const { auth0Nuked, dbNuked } = await nukeMiddleware();

  if (auth0Nuked && dbNuked) {
    console.log("AUTH0 and DB NUKED!!!");
    return;
  }
  console.log(`{ Auth0_Status: ${auth0Nuked}\nDB_Status: ${dbNuked} }`);
  return;
}

function initializeNukeScheduler() {
  schedule.scheduleJob("0 0 * * *", myMidnightTask);
  console.log(
    "Task scheduler initialized: Nuke will run every day at midnight."
  );
}

module.exports = initializeNukeScheduler;
