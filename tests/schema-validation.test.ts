import { userValidator } from '../src/utils/schema-validation';
import { describe, it, expect } from 'vitest';

describe('SchemaValidator', () => {
  it('should validate valid data', () => {
    const validUser = { name: 'Alice', email: 'alice@example.com', age: 25 };
    expect(userValidator.validate(validUser)).toEqual(validUser);
  });

  it('should throw an error for invalid data', () => {
    const invalidUser = { name: '', email: 'invalid-email', age: -1 };
    expect(() => userValidator.validate(invalidUser)).toThrow();
  });
});
