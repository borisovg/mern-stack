import { STATUS_CODES } from 'http';

export class ExpressError extends Error {
  cause: unknown;

  constructor(
    err: unknown,
    public statusCode = 500,
  ) {
    super(STATUS_CODES[statusCode]);
    this.cause = formatError(err);
  }
}

export function makeError(err: unknown, statusCode?: number) {
  return new ExpressError(err, statusCode);
}

export function formatError(err: unknown) {
  const err2 = err as Record<string, unknown>;

  return typeof err === 'object'
    ? { ...err2, code: err2.code, name: err2.name }
    : err;
}
