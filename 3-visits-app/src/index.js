const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient();
const initialNumberOfVisits = 0;

client.set("visits", initialNumberOfVisits);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (err) {
      res.send("Database is down, sorry unable to fetch total number of visits");
    }

    res.send("Total number of visits is " + visits);

    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
