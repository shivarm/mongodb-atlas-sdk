## Data Aggregation

The `DataAggregation` class provides methods to perform complex data aggregation operations using MongoDB's aggregation framework.

Here is an example of how to use ?

```typescript
import express, { Request, Response } from 'express';
import { DataAggregation } from 'mongodb-atlas-sdk';
import { User } from '../model/userModel';

const app = express();
app.use(express.json({ limit: '10mb' }));

const dataAggregation = new DataAggregation();

app.get('/users/age-stats', async (req: Request, res: Response) => {
  try {
    const groupByField = req.query.groupByField as string | undefined;
    const pipeline = [
      {
        $group: {
          _id: groupByField ? `$${groupByField}` : null, // Group by specified field or group all documents together
          averageAge: { $avg: '$age' },
          minAge: { $min: '$age' },
          maxAge: { $max: '$age' },
        },
      },
    ];

    const result = await dataAggregation.aggregateData(User, pipeline);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to aggregate data', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Based on your schema it will give you the average, minimum and maximum age of users.
