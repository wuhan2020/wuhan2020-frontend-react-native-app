import CryptoJS from 'crypto-js';

type Algorithm = 'sha1' | 'sha256' | 'sha512';

class Crypto {
  readonly algorithm: Algorithm;
  readonly secret: string;
  hex: string;

  constructor(algo: Algorithm, secret: Buffer) {
    this.algorithm = algo;
    this.secret = secret.toString('hex');
    this.hex = '';
  }

  static createHmac(algorithm: Algorithm = 'sha1', hmacSecret: Buffer) {
    return new Crypto(algorithm, hmacSecret);
  }

  update(bufferHex: Buffer) {
    this.hex = bufferHex.toString('hex');
    return this;
  }

  getEncoder() {
    switch (this.algorithm) {
      case 'sha1':
        return CryptoJS.HmacSHA1;
      case 'sha256':
        return CryptoJS.HmacSHA256;
      case 'sha512':
        return CryptoJS.HmacSHA512;
      default:
        throw new Error(
          `Unsupported algorithm ${
            this.algorithm
          }. Accepts: sha1, sha256, sha512`,
        );
    }
  }

  digest() {
    const encoder = this.getEncoder();
    const message = CryptoJS.enc.Hex.parse(this.hex);
    const hmac = encoder(message, CryptoJS.enc.Hex.parse(this.secret));

    return global.Buffer.from(hmac.toString(CryptoJS.enc.Hex), 'hex');
  }
}

export default Crypto;
