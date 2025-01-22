## Custom Schema

You can create your custom schema with zod and validate your data with the `SchemaValidator` class.

```javascript
import { z } from 'zod';
import { SchemaValidator } from 'mongodb-atlas-sdk';

// Define a custom schema
const productSchema = z.object({
  id: z.string().uuid('Invalid product ID'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
});

// Create a validator for the custom schema
const productValidator = new SchemaValidator(productSchema);

// Example data to validate
const productData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Example Product',
  price: 19.99,
};

try {
  // Validate the data
  const validatedProduct = productValidator.validate(productData);
  console.log('Validated product:', validatedProduct);
} catch (error) {
  console.error('Validation error:', error.message);
}
```
