## How to use query caching ?

The `queryCache` method that adds query caching functionality to your Mongoose models using Redis. This plugin helps improve the performance of your application by caching the results of frequently accessed queries, reducing the load on the database, and speeding up response times for your users. Let's see how to use this plugin in your Mongoose models.

```typescript
import mongoose from 'mongoose';
import { queryCache } from 'mongodb-atlas-sdk';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Apply the query caching plugin to the user schema
userSchema.plugin(queryCache);

export const User = mongoose.model('User', userSchema);
```

**Note:** You can now use the following methods:

- `User.clearCache()` - Clear cache
- `User.cache()`- Cache the result of the query

```typescript
import { Request, Response } from 'express';
import { User } from '../model/userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    await User.clearCache('all_users'); // Clear cache after creating a new user
    res.status(201).send(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.cache('all_users', User.find()); // Cache the result of the query
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
```
