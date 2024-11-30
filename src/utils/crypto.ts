export async function generateKeyPair(): Promise<CryptoKeyPair> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function encryptMessage(
  message: string,
  publicKey: CryptoKey
): Promise<string> {
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(message);
  
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    encodedMessage
  );
  
  return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
}

export async function decryptMessage(
  encryptedMessage: string,
  privateKey: CryptoKey
): Promise<string> {
  const decoder = new TextDecoder();
  const encryptedData = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
  
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    privateKey,
    encryptedData
  );
  
  return decoder.decode(decryptedData);
}