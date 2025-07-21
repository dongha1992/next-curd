import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';

export const hashToken = (token: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
};
