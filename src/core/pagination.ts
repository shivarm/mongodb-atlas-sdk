import mongoose from 'mongoose';
import { logger } from '../logger.ts';

interface PaginationOptions {
  page: number;
  limit: number;
  sort?: any;
  select?: any;
  populate?: any;
}

export class DataPagination {
  async paginateResult(model: mongoose.Model<any>, query: any = {}, options: PaginationOptions): Promise<any> {
    let { page = 1, limit = 10, sort, select, populate } = options;

    if (page < 1) {
      page = 1;
    }

    try {
      const skip = (page - 1) * limit;
      let queryBuilder = model.find(query).skip(skip).limit(limit).lean();

      if (sort) {
        queryBuilder.sort(sort);
      } else {
        queryBuilder = queryBuilder.sort({ createdAt: -1 }); // Default sorting
      }

      if (select) {
        queryBuilder = queryBuilder.select(select);
      }

      if (populate) {
        queryBuilder = queryBuilder.populate(populate);
      }

      const result = await queryBuilder.exec();
      const total = await model.countDocuments(query).exec();

      return {
        result,
        total,
        page,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Failed to paginate data: ${error.message}`);
        throw new Error(`Failed to paginate data: ${error.message}`);
      }
    }
  }
}
