import config from './config';

// interface Request {
//   email: string,
//   hash: string,
//   standard: string,
// }

export default async function validateAttestation(certificateHash: string) {
  const { endpoint, email } = config;
  const attestationRequestResult = await fetch(`${endpoint}/request-attest/`, {
    method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        hash: certificateHash,
      })
  });
  return attestationRequestResult.json();
}