import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private async getEncryptionKey(): Promise<CryptoKey> {
    const keyHex = localStorage.getItem('encryption_key');
    if (keyHex) {
      const keyBuffer = new Uint8Array(keyHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
      return await window.crypto.subtle.importKey(
        'raw',
        keyBuffer,
        'AES-GCM',
        true,
        ['encrypt', 'decrypt']
      );
    } else {
      const aesKey = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      );
      const keyExported = await window.crypto.subtle.exportKey('raw', aesKey);
      const keyHex = Array.from(new Uint8Array(keyExported))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
      localStorage.setItem('encryption_key', keyHex);
      return aesKey;
    }
  }

  async encryptText(data: string): Promise<string | null> {
    try {
      if (data == null) {
        return null;
      }
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const aesKey = await this.getEncryptionKey();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encryptedDataBuffer = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        aesKey,
        dataBuffer
      );
      const combinedBuffer = new Uint8Array(iv.length + encryptedDataBuffer.byteLength);
      combinedBuffer.set(iv, 0);
      combinedBuffer.set(new Uint8Array(encryptedDataBuffer), iv.length);
      const encryptedHex = Array.from(combinedBuffer)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
      return encryptedHex;
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  }

  async decryptText(data: string): Promise<string | null> {
    try {
      if (data == null) {
        return null;
      }
      const combinedBuffer = new Uint8Array(data.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
      const iv = combinedBuffer.slice(0, 12);
      const encryptedData = combinedBuffer.slice(12);
      const aesKey = await this.getEncryptionKey();
      const decryptedDataBuffer = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        aesKey,
        encryptedData
      );
      const decoder = new TextDecoder();
      const decryptedText = decoder.decode(decryptedDataBuffer);
      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }

  storeEncryptedText(key: string, encryptedText: string): void {
    localStorage.setItem(key, encryptedText);
  }

  getEncryptedText(key: string): string | null {
    return localStorage.getItem(key);
  }
}
