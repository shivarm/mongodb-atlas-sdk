import mongoose, { Schema, Document } from 'mongoose';

// Define the IBackup interface
export interface IBackup extends Document {
  collectionName: string;
  data: any[];
}

// Define the Mongoose schema for backup
const backupSchema = new Schema<IBackup>(
  {
    collectionName: { type: String },
    data: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

// Create the Mongoose model for backup
export const BackupModel = mongoose.model<IBackup>('Backup', backupSchema);
