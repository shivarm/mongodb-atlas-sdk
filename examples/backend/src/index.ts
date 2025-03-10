import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoDbConnection } from 'mongodb-atlas-sdk';
import userRoutes from './routes/userRoutes';
import backupRoutes from './routes/userRoutes';

dotenv.config();

const mongoKit = new MongoDbConnection(process.env.DB_URI!);
mongoKit.connect();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/users/backup', backupRoutes);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
