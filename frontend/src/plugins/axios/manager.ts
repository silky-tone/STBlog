import type { AxiosRequestConfig, Canceler } from 'axios';
import { CancelToken } from 'axios';

export class Manager {
  private requests: Map<string, Canceler>;

  constructor() {
    this.requests = new Map();
  }

  get pending(): number {
    return this.requests.size;
  }

  private generateKey(config: AxiosRequestConfig): string {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
  }

  push(config: AxiosRequestConfig): void {
    const key = this.generateKey(config);

    if (this.requests.has(key)) {
      const cancel = this.requests.get(key);
      cancel && cancel('Duplicate request');
      this.requests.delete(key);
    }

    config.cancelToken = new CancelToken((cancel) => {
      this.requests.set(key, cancel);
    });
  }

  remove(config: AxiosRequestConfig): void {
    this.requests.delete(this.generateKey(config));
  }

  cancel(message?: string): void {
    this.requests.forEach((cancel, key) => {
      cancel(message || 'cancel All Requests');
      this.requests.delete(key);
    });
  }
}
