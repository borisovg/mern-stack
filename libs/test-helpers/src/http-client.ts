import { request } from 'undici';

export class HttpClient {
  port: number;

  constructor(opts: { port: number }) {
    this.port = opts.port;
  }

  delete(path: string) {
    return request(this.getUrl(path), { method: 'DELETE' });
  }

  get(path: string) {
    return request(this.getUrl(path), { method: 'GET' });
  }

  patch(path: string, data: Record<string, unknown>) {
    return request(this.getUrl(path), {
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
      method: 'PATCH',
    });
  }

  post(path: string, data?: Record<string, unknown>) {
    return request(this.getUrl(path), {
      method: 'POST',
      ...(data
        ? {
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
          }
        : {}),
    });
  }

  put(path: string, data: Record<string, unknown>) {
    return request(this.getUrl(path), {
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
      method: 'PATCH',
    });
  }

  private getUrl(path: string) {
    return `http://localhost:${this.port}${path}`;
  }
}
