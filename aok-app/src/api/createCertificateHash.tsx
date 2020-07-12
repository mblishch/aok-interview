import * as crypto from 'crypto';
import { hashFullCertificate } from '@aokpass/aok-sdk';

const digest = (b): Promise<Buffer> => {
  return new Promise(r =>
    r(
      crypto
        .createHash("sha256")
        .update(b)
        .digest()
    )
  );
};

export default async function createCertificateHash(fullCertificate) {
  const certificateHash: string = await hashFullCertificate(fullCertificate, digest);
  return certificateHash;
}