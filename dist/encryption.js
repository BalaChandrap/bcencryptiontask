"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function generateKeyPair() {
    const { privateKey, publicKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
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
function encryptData(data, publicKey) {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = (0, crypto_1.publicEncrypt)(publicKey, buffer);
    return encrypted;
}
// Function to decrypt data
function decryptData(encryptedData, privateKey, passphrase) {
    const decrypted = (0, crypto_1.privateDecrypt)({
        key: privateKey,
        passphrase: passphrase,
    }, encryptedData);
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
