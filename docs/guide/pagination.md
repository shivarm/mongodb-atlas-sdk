## How to handle pagination ?

Pagination is a common requirement in applications that deal with large datasets. The `mongodb-atlas-sdk` provides a simple way to implement pagination using the `DataPagination` class. let's explore how to use it effectively. It will return most recent data first.

```typescript
import express, { Request, Response } from 'express';
import { DataPagination } from 'mongodb-atlas-sdk';
import { User } from '../model/userModel';

const app = express();
const dataPagination = new DataPagination();

app.get('/users', async (req: Request, res: Response) => {
  try {
    const { page, limit, sort, select, populate } = req.query;
    const options = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(limit as string, 10) || 10,
      sort: sort ? JSON.parse(sort as string) : { createdAt: -1 },
      select: select ? JSON.parse(select as string) : null,
      populate: populate ? JSON.parse(populate as string) : null,
    };

    const result = await dataPagination.paginateResult(User, {}, options);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to paginate users', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Example query to filter users

You can also filter users based on certain criteria. For example, if you want to filter users older than a certain age, you can modify the query as follows:

```typescript
import express, { Request, Response } from 'express';
import { DataPagination } from 'mongodb-atlas-sdk';
import { User } from '../model/userModel';

const app = express();
const dataPagination = new DataPagination();

app.get('/users', async (req: Request, res: Response) => {
  try {
    const { page, limit, sort, select, populate, age } = req.query;
    const options = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(limit as string, 10) || 10,
      sort: sort ? JSON.parse(sort as string) : { createdAt: -1 },
      select: select ? JSON.parse(select as string) : null,
      populate: populate ? JSON.parse(populate as string) : null,
    };

    // Example query to filter users older than a certain age
    const query = age ? { age: { $gt: parseInt(age as string, 10) } } : {};

    const result = await dataPagination.paginateResult(User, query, options);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to paginate users', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Example Response

```json
{
  "results": [
    {
      "_id": "679a1343c406f835121d0f9d",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 31,
      "__v": 0
    },
    {
      "_id": "67a98564855d0233c02db952",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "age": 28,
      "__v": 0
    }
  ],
  "total": 2,
  "page": 1,
  "pages": 1
}
```
