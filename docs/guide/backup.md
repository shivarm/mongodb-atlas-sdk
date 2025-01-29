## How to Backup Data?

To backup data from a MongoDB Atlas collection, you can use the `Backup` class provided by the SDK. Below is an example of how to backup data from the User model.

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

## How to Restore Data ?

To restore data from a backup file, you can use the `Restore` class provided by the SDK. Below is an example of how to restore data from a backup file.

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
