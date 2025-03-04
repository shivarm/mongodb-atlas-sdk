import mongoose from 'mongoose';

export class DataPagination {
  async paginateResult(model: mongoose.Model<any>, page: number, limit: number, query: any = {}): Promise<any> {
    if (page < 1) {
      page = 1;
    }
    const skip = (page - 1) * limit;
    const result = await model.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec();
    const total = await model.countDocuments(query).exec();

    return {
      result,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}
