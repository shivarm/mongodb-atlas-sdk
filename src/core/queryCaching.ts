import { Schema } from 'mongoose';
import { createClient } from '@redis/client';
import { logger } from '../logger.js';

const redisClient = createClient();

redisClient.connect().catch((error) => {
  logger.error('Failed to connect to Redis:', error);
});

export function queryCachingPlugin(schema: Schema, options: { cacheKeyPrefix: string } = { cacheKeyPrefix: 'cache:' }) {
  schema.statics.cache = async function (key: string, query: any, ttl: number = 60) {
    const cacheKey = `${options.cacheKeyPrefix}${key}`;
    logger.info(`Attempting to retrieve cache for key: ${cacheKey}`);
    const cachedResult = await redisClient.get(cacheKey);

    if (cachedResult) {
      logger.info(`Cache hit for key: ${cacheKey}`);
      return JSON.parse(cachedResult);
    }
    logger.info(`Cache miss for key: ${cacheKey}. Executing query.`);
    const result = await query.exec();
    await redisClient.set(cacheKey, JSON.stringify(result), { EX: ttl });
    logger.info(`Cache set for key: ${cacheKey} with TTL: ${ttl} seconds`);
    return result;
  };

  schema.statics.clearCache = async function (key: string) {
    const cacheKey = `${options.cacheKeyPrefix}${key}`;
    await redisClient.del(cacheKey);
    logger.info(`Cache cleared for key: ${cacheKey}`);
  };
}
