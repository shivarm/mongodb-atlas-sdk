import { Schema } from 'mongoose';
import { logger } from '../logger.ts';

export function auditLog(schema: Schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      logger.info(`Creating new document: ${JSON.stringify(this.toObject())}`);
    } else {
      logger.info(`Updating document: ${JSON.stringify(this.toObject())}`);
    }
    next();
  });

  schema.pre('deleteOne', { document: true, query: false }, function (next) {
    logger.info(`Removing document: ${JSON.stringify(this.toObject())}`);
    next();
  });

  schema.pre('deleteMany', { document: false, query: true }, function (next) {
    logger.info(`Removing documents with query: ${JSON.stringify(this.getFilter())}`);
    next();
  });
}
