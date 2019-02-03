import * as CryptoJS from 'crypto-js';
import config from 'src/config/index';

const AesEncrypt = msg => CryptoJS.AES.encrypt(msg, config.secretSalt).toString();
const AesDecrypt = encryptedMsg => CryptoJS.AES.decrypt(
  encryptedMsg, config.secretSalt
).toString(CryptoJS.enc.Utf8);

export default {
  AesEncrypt,
  AesDecrypt,
};

export {
  AesEncrypt,
  AesDecrypt
};
