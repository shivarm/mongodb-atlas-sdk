import { createClient, RedisClientType } from '@redis/client';
import { logger } from '../logger.ts';

let redisClient: RedisClientType;
let isRedisAvailable = false;

export async function initializeRedis() {
  if (!redisClient) {
    try {
      redisClient = createClient();
      await redisClient.connect();
      logger.info('Connected to Redis');
      isRedisAvailable = true;
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
    }
  }
}

export function getRedisClient() {
  return redisClient;
}

export function isRedisConnected() {
  return isRedisAvailable;
}
