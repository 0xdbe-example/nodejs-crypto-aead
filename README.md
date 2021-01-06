# Nodejs Crypto AEAD

This application is a prototype using [NodeJS Crypto API](https://nodejs.org/api/crypto.html) to perform AEAD (Authenticated Encryption with Associated Data) encryption.


# Run

```
node app.js
```

# Result

```
Encryption : 
 - plaintext: Good morning Alice! How are you today?
 - cipher text: +d5U1MJwpiI7Mcej1o9O5tW5uE9BJwaa6NKq3mxQt+c8sJSP120=
 - Init vector: eFx7pHQmtYAVR3jC9T7f5g==
 - authentication tag: lzcR1n/apPRfL0fQM1YVdw==

Decryption : 
 - plaintext: Good morning Alice! How are you today?
```
