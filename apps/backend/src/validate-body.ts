import { ZodSchema, type ZodError } from 'zod';

class ValidationError extends Error {
  cause: unknown;

  constructor(err: unknown) {
    super('Validation error');
    this.cause = JSON.stringify((err as ZodError).issues, undefined, 2);
    delete this.stack;
  }
}

export function validateBody(schema: ZodSchema, body: unknown) {
  try {
    return schema.parse(body);
  } catch (e) {
    throw new ValidationError(e);
  }
}
