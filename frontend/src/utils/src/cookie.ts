export interface CookieOptions {
  path?: string;
  domain?: string;
  secure?: boolean;
  expires?: number;
  httpOnly?: boolean;
}

export class Cookie {
  static set(name: string, value: string, options: CookieOptions = {}): void {
    const data = [
      `${name}=${value}`,
      options.path ? `path=${options.path}` : '',
      options.secure ? 'secure' : '',
      options.httpOnly ? 'httpOnly' : '',
      options.domain ? `domain=${options.domain}` : '',
      options.expires ? `max-age=${options.expires}` : '',
      options.expires ? `expires=${new Date(Date.now() + options.expires * 1000).toUTCString()}` : '',
    ];
    document.cookie = data.filter(Boolean).join('; ');
  }

  static get(name: string): string {
    return document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))?.[2] || '';
  }

  static remove(name: string): void {
    Cookie.set(name, '', { expires: -1 });
  }

  static keys(): string[] {
    return document.cookie.split('; ').map(item => item.split('=')[0]);
  }

  static clear(): void {
    Cookie.keys().forEach(key => Cookie.remove(key));
  }
}
