// Import crypto module
const crypto = require('crypto');

exports.encrypt = function (plainText, associatedData, secretKey) {
 
  // Configuration
  let algorithm = 'aes-128-gcm';
  let initVector = crypto.randomBytes(16);
  let inputEncoding = 'utf8';
  let outputEncoding = 'base64';
    
  //Encryption
  let cipher = crypto.createCipheriv(algorithm, secretKey, initVector);
    
  // Set associatedData
  cipher.setAAD(Buffer.from(associatedData));
    
  // Encrypt
  let encrypted = cipher.update(plainText, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);
    
  // Get authentication tag
  let authTag = cipher.getAuthTag();

  // Return data
  //return authTag.toString(outputEncoding) + "." + initVector.toString(outputEncoding) + "." + encrypted;
  
  // build cipherData
  let cipherData = {}
  cipherData.initVector = initVector.toString(outputEncoding)
  cipherData.authTag = authTag.toString(outputEncoding);
  cipherData.cipherText = encrypted;
  
  return cipherData;
};


exports.decrypt = function (cipherText, associatedData, secretKey, initVector, authTag){
    
    // Configuration
    let algorithm = 'aes-128-gcm';
    let inputEncoding = 'base64';
    let outputEncoding = 'utf8';
    
    // Decryption
    let decipher = crypto.createDecipheriv(algorithm, secretKey, initVector);
    
    decipher.setAAD(Buffer.from(associatedData));
    decipher.setAuthTag(Buffer.from(authTag));
    
    let decrypted = decipher.update(cipherText, inputEncoding, outputEncoding);
    
    //==> si le authTag est faux, alors le .final ne pourra pas se faire :
    // Error: Unsupported state or unable to authenticate data
    decrypted += decipher.final(outputEncoding);
    return decrypted;

}


