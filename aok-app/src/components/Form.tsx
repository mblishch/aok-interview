import React, { useState } from 'react';
import './Form.css';

import Input from './Input';
import SubmitButton from './SubmitButton';

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

  const onChange = (name: string, value: string) => {
    setFormValue({
      ...formData,
      [name]: value,
    });
    // console.log('formData', formData);
  }

  const onSubmit = async (event: any) => {
    const { firstName, lastName, birthDate } = formData;
    const fullCertificate: FullCertificate = { 
      _schema_version: "0.1",
      standard: "id of certificate standard that describes type of certificate",
      publicData: [firstName, lastName, birthDate],
      privateData: ["secret"],
    };

    const certificateHash = await createCertificateHash(fullCertificate);
    
    const validationResult = await validateAttestation(certificateHash);
    if (validationResult.success) {
      const attestationData = await getAttestationData(certificateHash);
      const attestedCertificate: AttestedCertificate = {
        ...attestationData,
        ...fullCertificate,
      };
      downloadObjectAsJson(attestedCertificate, 'attested_certificate');
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
    </form>
  );
}

export default Form;
