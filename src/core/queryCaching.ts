import { Schema } from 'mongoose';
import { logger } from '../logger.js';
import { initializeRedis, getRedisClient, isRedisConnected } from '../utils/redisClient.js';

export function queryCache(
  schema: Schema,
  options: { cacheKeyPrefix?: string; defaultTTL?: number } = { cacheKeyPrefix: 'cache:', defaultTTL: 60 },
) {
  const { cacheKeyPrefix, defaultTTL } = options;

  schema.statics.cache = async function (key: string, query: any, ttl: number = defaultTTL || 60) {
    await initializeRedis();
    if (!isRedisConnected()) {
      logger.warn('Redis is not available. Executing query without caching.');
      return query.exec();
    }

    const redisClient = getRedisClient();
    const cacheKey = `${cacheKeyPrefix}${key}`;
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
    await initializeRedis();
    if (!isRedisConnected()) {
      logger.warn('Redis is not available. Cannot clear cache.');
      return;
    }

    const redisClient = getRedisClient();
    const cacheKey = `${cacheKeyPrefix}${key}`;
    await redisClient.del(cacheKey);
    logger.info(`Cache cleared for key: ${cacheKey}`);
  };
}
