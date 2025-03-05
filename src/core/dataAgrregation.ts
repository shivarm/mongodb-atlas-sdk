import mongoose from 'mongoose';
import { logger } from '../logger.ts';

export class DataAggregation {
  async aggregateData(model: mongoose.Model<any>, pipeline: any[]): Promise<any> {
    try {
      const result = await model.aggregate(pipeline).exec();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Failed to aggregate data: ${error.message}`);
        throw new Error(`Failed to aggregate data: ${error.message}`);
      }
    }
  }
}
