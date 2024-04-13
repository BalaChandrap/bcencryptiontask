import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';

function generateKeyPair() {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'blockchain task'
    }
  });
  return { privateKey, publicKey };
}

// Function to encrypt data
function encryptData(data: string, publicKey: string): Buffer {
  const buffer = Buffer.from(data, 'utf8');
  const encrypted = publicEncrypt(publicKey, buffer);
  return encrypted;
}

// Function to decrypt data
function decryptData(encryptedData: Buffer, privateKey: string, passphrase: string): string {
  const decrypted = privateDecrypt(
    {
      key: privateKey,
      passphrase: passphrase,
    },
    encryptedData
  );
  return decrypted.toString('utf8');
}

// Example usage
const { privateKey, publicKey } = generateKeyPair();
const plainText = 'Blockchain class task 1';
const encryptedMessage = encryptData(plainText, publicKey);
const decryptedMessage = decryptData(encryptedMessage, privateKey, 'blockchain task');

console.log('Original Message:', plainText);
console.log('Encrypted Message:', encryptedMessage.toString('base64'));
console.log('Decrypted Message:', decryptedMessage);
