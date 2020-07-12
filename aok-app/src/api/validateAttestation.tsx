import { FullCertificate } from '@aokpass/aok-sdk';
import config from './config';

export default async function validateAttestation(fullCertificate: FullCertificate, certificateHash: string) {
  const { endpoint, email } = config;
  const attestationRequestResult = await fetch(`${endpoint}/request-attest/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      hash: certificateHash,
      standard: fullCertificate.standard,
    })
  });
  return await attestationRequestResult.json();
}