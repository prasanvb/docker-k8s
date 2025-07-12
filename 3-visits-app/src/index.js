const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  url: "redis://redis-server:6379",
  /* NOTE: Docker has cool feature to reference service name from the docker-compose.yml in the connection url
   */

  // redis v4+ requires explicit socket configuration
  // socket: {
  //   host: "redis-server",
  //   port: 6379,
  // },
});

const initialNumberOfVisits = 0;

// Make sure to connect redis
client.on("error", (err) => console.log("Redis Client Error", err));

const connectWithRetry = async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");

    // Initialize visits counter AFTER connection is established
    const existingVisits = await client.get("visits");
    if (existingVisits === null) {
      await client.set("visits", initialNumberOfVisits);
      console.log("Initialized visits counter");
    }
  } catch (err) {
    console.log("Redis connection failed, retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

app.get("/", async (req, res) => {
  try {
    // Get current visits count
    const visits = await client.get("visits");

    // Send response with current count
    res.send("Total number of visits is " + visits);

    // Increment visits counter
    await client.set("visits", parseInt(visits) + 1);
  } catch (err) {
    console.error("Redis error:", err);
    res.send("Database is down, sorry unable to fetch total number of visits");
  }
});

app.listen(8081, () => {
  console.log("App server started");
});
