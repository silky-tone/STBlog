import * as cryptoJs from 'crypto-js';

const AesIv = import.meta.env.VITE_AES_IV;

const AesKey = import.meta.env.VITE_AES_KEY;

/* aes cbc */
export class AES {
  static encrypt(text: string, key?: string, iv?: string): string {
    return cryptoJs.AES.encrypt(text, key || AesKey, {
      iv: iv || AesIv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7,
    }).toString();
  }

  static decrypt(text: string, key?: string, iv?: string): string {
    return cryptoJs.AES.decrypt(text, key || AesKey, {
      iv: iv || AesIv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7,
    });
  }
}
