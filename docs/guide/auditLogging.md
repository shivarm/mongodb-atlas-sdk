## How to Audit Logging ?

This feature will track changes to documents and log them for auditing purposes. This can be useful for monitoring changes, debugging, and ensuring data integrity. The audit log will track the following information:

```typescript
import mongoose from 'mongoose';
import { auditLog } from 'mongodb-atlas-sdk';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Apply the audit logging to the user schema
userSchema.plugin(auditLog);

export const User = mongoose.model('User', userSchema);
```

This setup allows you to track changes to documents and log them for auditing purposes. The auditLoggingPlugin logs the creation, update, and removal of documents, helping you monitor changes, debug issues, and ensure data integrity.
