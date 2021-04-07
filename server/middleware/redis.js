const redis = require("redis");
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require("./../config");
const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
});
client.on("connect", () => {
  console.log("Client connected to redis..");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use..");
});

client.on("error", (err) => {
  console.log(err);
});

client.on("end", () => {
  console.log("Client disconnected from redis server");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
