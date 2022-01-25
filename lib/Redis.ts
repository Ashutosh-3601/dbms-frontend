import Redis from 'ioredis'

const redis = new Redis(6379);

export default redis;