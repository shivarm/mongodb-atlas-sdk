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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await dataPagination.paginateResults(User, page, limit);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to paginate data', error: err.message });
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
