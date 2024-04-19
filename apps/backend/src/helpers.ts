import { STATUS_CODES } from 'http';
import { type ZodError } from 'zod';
import { v4 } from 'uuid';

export function fromZodError(err: unknown) {
  return {
    status: 400,
    message: STATUS_CODES[400],
    cause: (err as ZodError).issues[0],
  };
}

export function makeUuid() {
  return v4();
}
