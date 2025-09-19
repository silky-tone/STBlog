import { AES } from './crypto.ts';

const appName = import.meta.env.VITE_APP_NAME || '';

export interface StorageOptions {
  aes?: boolean; // TODO: 加密
  expire?: number; // TODO: 过期时间
}

export class Storage {
  static handlerKey(key: string) {
    return appName ? `${appName}_${key}` : key;
  }

  static set(key: string, value: any, options: StorageOptions = {}) {
    const expire = options.expire ? (Date.now() + options.expire * 1000) : 0;
    let text = JSON.stringify(value);
    if (options.aes) text = AES.encrypt(text);
    localStorage.setItem(Storage.handlerKey(key), JSON.stringify({
      ...options,
      expire,
      value: text,
      aes: options.aes || false,
    }));
  }

  static get(key) {
    const value = JSON.parse(localStorage.getItem(Storage.handlerKey(key)) || 'null');
    if (!value || (value.expire && value.expire < Date.now())) return null;
    return value.aes ? AES.decrypt(value.value) : value.value;
  }

  static remove(key) {
    localStorage.removeItem(Storage.handlerKey(key));
  }

  static keys() {
    const prefix = Storage.handlerKey('');
    return localStorage.keys().filter(key => key.startsWith(prefix));
  }

  static clear() {
    Storage.keys().forEach(key => {
      localStorage.removeItem(key);
    });
  }

  static clearExpire() {
    Storage.keys().forEach(key => {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      if (value && value.expire && value.expire < Date.now()) {
        localStorage.removeItem(key);
      }
    });
  }
}
