## How to create a backup?

You can use the `Backup` class provided by the SDK. Below is an example of how to backup data from the User model. The `backupToDB` method takes three parameters: the current model, the backup model, and an optional object containing additional options.

### Create a backup model

I assume you have a User model. Below is an example of how to create a backup model.

```typescript
import mongoose, { Schema, Document } from 'mongoose';

// Define the IBackup interface
export interface IBackup extends Document {
  collection: string;
  data: any[];
}

// Define the Mongoose schema for backup
const backupSchema = new Schema<IBackup>(
  {
    collection: { type: String, required: true },
    data: { type: [Schema.Types.Mixed], required: true },
  },
  { timestamps: true },
);

// Create the Mongoose model for backup
export const BackupModel = mongoose.model<IBackup>('Backup', backupSchema);
```

```typescript
import { Request, Response } from 'express';
import { Backup } from 'mongodb-atlas-sdk';
import { User } from '../models/userModel';
import { BackupModel } from '../models/backupModel';

const backup = new Backup();
export const backupUser = async (req: Request, res: Response) => {
  try {
    await backup.backupToDB(User, BackupModel);
    res.status(200).json({ message: 'Backup completed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to backup data', error: err.message });
  }
};
```

## How to Backup Data locally?

To backup data from a MongoDB Atlas collection, you can use the `Backup` class provided by the SDK. Below is an example of how to backup data from the User model.`backupModel` method takes three parameters: the model, the file path where the backup will be saved, and an optional object containing additional options.

```typescript
import { Request, Response } from 'express';
import { Backup } from 'mongodb-atlas-sdk';
import { User } from '../models/userModel';

const backup = new Backup();

export const backupUser = async (req: Request, res: Response) => {
  try {
    const filePath = req.body.filePath;
    await backup.backupModel(User, filePath);
    res.status(200).json({ message: 'Backup completed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to backup data', error: err.message });
  }
};
```

## Backup with optional fields

You can also pass optional fields to the `backupModel` method. Below is an example of how to backup data from the User model with optional fields.

```typescript
import { Request, Response } from 'express';
import { User } from '../model/userModel';
import { Backup } from 'mongodb-atlas-sdk';

const backup = new Backup();

export const backupUser = async (req: Request, res: Response) => {
  try {
    const filePath = req.body.filePath;
    const fields = req.body.fields; // Get fields from request body
    await backup.backupModel(User, filePath, { fields });
    res.status(200).json({ message: 'Backup completed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to backup data' });
  }
};
```

You can test the backup and restore endpoints using Postman or any other API testing tool.

```json
{
  "filePath": "./backup/user_backup.json",
  "fields": ["name", "email"]
}
```

## How to Restore Data ?

To restore data from a backup file, you can use the `Restore` class provided by the SDK. Below is an example of how to restore data from a backup file. `restoreModel` method takes two parameters: the model and the file path from where the data will be restored.

```typescript
import { Request, Response } from 'express';
import { Restore } from 'mongodb-atlas-sdk';
import { User } from '../models/userModel';

const restore = new Restore();

export const restoreUser = async (req: Request, res: Response) => {
  try {
    const filePath = req.body.filePath;
    await restore.restoreModel(User, filePath);
    res.status(200).json({ message: 'Data restored successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to restore data', error: err.message });
  }
};
```

You can test the backup and restore endpoints using Postman or any other API testing tool. Below is an example of the request body for the backup and restore endpoints. Make sure, in my case backup or your directory exists before running the backup operation.

```json
{
  "filePath": "./backup/user_backup.json"
}
```

## Example backend application

Check our user CRUD application on [Github](https://github.com/shivarm/mongodb-atlas-sdk/tree/main/examples/typescript)
