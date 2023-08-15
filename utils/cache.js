const redis = require("redis");

class Cache {
    constructor(client) {
        this.client = client;
    }
}

const redisClient = redis.createClient({ socket: {
    port: 5010,
    host: "cache",
    password: ""
}});

redisClient.connect();

const cache = new Cache(redisClient);
Object.freeze(cache);
module.exports = cache;
