const aeadEncryption = require('./aead.js');

// Define plaintext and secret key
var message = "Good morning Alice! How are you today?";
var secret = Buffer.from("VeryStrongSecret");
var associatedData = "alice@mail.com"

console.log("Encryption : ");
console.log(" - plaintext: " + message);

// Encrypt
var cipherData = aeadEncryption.encrypt(message, associatedData, secret);
console.log(" - cipher text: " + cipherData.cipherText);
console.log(" - Init vector: " + cipherData.initVector);
console.log(" - authentication tag: " + cipherData.authTag);

console.log("");
console.log("Decryption : ");

// Decrypt
var plaintext = aeadEncryption.decrypt(
    Buffer.from(cipherData.cipherText,"base64"),
    associatedData,
    Buffer.from("VeryStrongSecret","utf8"),
    Buffer.from(cipherData.initVector,"base64"),
    Buffer.from(cipherData.authTag,"base64")
    //Buffer.from("SjAuHeEjDg5uc7/PSotjCg==","base64")
);

console.log(" - plaintext: " + plaintext);
