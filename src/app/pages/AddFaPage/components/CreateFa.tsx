import React, { useEffect, useState } from 'react';
import FormFields from './FormFields';
import ValidateChecked from './ValidateChecked';
import TransitionForm from './TransitionForm';
import { getTransitionObjectFromForm } from 'utils/form-utils';
import FaModel from 'app/models/FaModel';

const CreateFa = () => {
  const [faData, setFaData] = useState<any>();
  const onSubmit = (data, e) => {
    const {
      initialState,
      states,
      alphabets,

      endStates,
      ...newData
    } = data;
    const Fa = {
      initialState,
      states,
      alphabets,

      endStates,
      transitions: getTransitionObjectFromForm(data),
    };
    setFaData(Fa);
  };
  useEffect(() => {
    if (faData) {
      const data = new FaModel(
        faData.states,
        faData.alphabets,
        faData.initialState,
        faData.endStates,
        faData.transitions,
      );
      console.log('IS NFA ?', data.isNFA());
    }

    console.log(faData);
  }, [faData]);

  return (
    <div
      style={{
        display: 'flex',
        marginTop: '12px',
        gap: '24px',
      }}
    >
      <FormFields onSubmit={onSubmit} />
    </div>
  );
};

export default CreateFa;
