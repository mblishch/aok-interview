import React, { useState } from 'react';
import './Form.css';

import Input from './Input';
import SubmitButton from './SubmitButton';
import Loader from './Loader';

import { createCertificateHash, validateAttestation, getAttestationData } from '../api';
import { FullCertificate, AttestedCertificate } from '@aokpass/aok-sdk';
import downloadObjectAsJson from '../utils/downloadObjectAsJson';

interface FormData {
  firstName: string,
  lastName: string,
  birthDate: string,
}

const createEmptyFormData = (): FormData => ({
  firstName: "",
  lastName: "",
  birthDate: "",
});

function Form() {
  let [formData, setFormValue]  = useState<FormData>(
    createEmptyFormData()
  );
  const [loading, setLoading] = useState(false);

  const onChange = (name: string, value: string) => {
    setFormValue({
      ...formData,
      [name]: value,
    });
  }

  const onSubmit = async (event: any) => {
    if (loading) {
      return false;
    }

    const { firstName, lastName, birthDate } = formData;
    const fullCertificate: FullCertificate = {
      _schema_version: "0.1",
      standard: "id of certificate standard that describes type of certificate",
      publicData: [firstName, lastName, birthDate],
      privateData: ["secret"],
    };

    setLoading(true);

    const certificateHash = await createCertificateHash(fullCertificate);

    const validationResult = await validateAttestation(fullCertificate, certificateHash);
    if (validationResult.success) {
      const attestationData = await getAttestationData(certificateHash);
      const attestedCertificate: AttestedCertificate = {
        ...attestationData,
        ...fullCertificate,
      };
      setLoading(false);
      downloadObjectAsJson(attestedCertificate, `attested_certificate_${Date.now()}`);
    } else {
      console.log('Not valid.');
    }
  };

  return (
    <form className="Form">
      <Input label="First name:" name="firstName" onChange={onChange} />
      <Input label="Last name:" name="lastName" onChange={onChange} />
      <Input label="Date of birth:" name="birthDate" onChange={onChange} />
      <SubmitButton value="Download" onSubmit={onSubmit} />
      {loading && <Loader />}
    </form>
  );
}

export default Form;
