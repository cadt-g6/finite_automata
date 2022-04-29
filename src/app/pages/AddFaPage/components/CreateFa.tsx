import React, { useState } from 'react';
import FormFields from './FormFields';
import ValidateChecked from './ValidateChecked';
import TransitionForm from './TransitionForm';

const CreateFa = () => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: '12px',
        gap: '24px',
      }}
    >
      <FormFields />
      <ValidateChecked />
    </div>
  );
};

export default CreateFa;
