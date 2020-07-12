import { AttestationData } from '@aokpass/aok-sdk';

import config from './config';

export default async function getAttestationData(certificateHash) {
  const { endpoint } = config;
  const proofRequestResult = await fetch(`${endpoint}/request-proof/${certificateHash}`);
  const { proof, store } = await proofRequestResult.json();
  const attestationData: AttestationData = {
    proof: proof,
    attestationStore: store,
    rootHash: proof.rootHash,
    id: certificateHash,
  };
  return attestationData;
};