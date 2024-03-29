import { encrypt, decrypt } from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';

const cipherKey = {
  key: 'this is common key',
  iv: 'this is test iv'
}

function getOptions() {
  return {
    mode: ECB,
    padding: pkcs7,
    iv: cipherKey.iv
  };
}

export function encryptByAES(cipherText: string) {
  return encrypt(cipherText, cipherKey.key, getOptions).toString();
}

export function decryptByAES(cipherText: string) {
  return decrypt(cipherText, cipherKey.key, getOptions).toString(UTF8);
}
