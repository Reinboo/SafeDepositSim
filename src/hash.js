export function hexString(buffer) {
  const byteArray = new Uint8Array(buffer);

  const hexCodes = [...byteArray].map((value) => {
    const hexCode = value.toString(16);
    return hexCode.padStart(2, '0');
  });

  return hexCodes.join('');
}

export function digestPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  return window.crypto.subtle.digest('SHA-256', data);
}
