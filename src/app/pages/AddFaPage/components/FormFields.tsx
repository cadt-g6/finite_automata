import React, { useEffect } from 'react';
import {
  Tooltip,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  styled,
  Box,
  Divider,
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';

import InputForm from './Fields/InputForm';
import SelectForm from './Fields/SelectForm';
import Title from './Title';
import TransitionForm from './TransitionForm';
import ValidateChecked from './ValidateChecked';
import { getArrayFromValues } from 'utils/form-utils';

const FormFields = ({ onSubmit }) => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '1' }}>
        <Title />
        <Divider sx={{ marginTop: '12px' }} />
        <div style={{ margin: '20px 0 0px 0' }}>
          <Controller
            name="states"
            control={control}
            rules={{
              required: 'Fields can not be empty',
              pattern: {
                value:
                  /^(((([a-z]|[A-Z]|[0-9])+\d*)(?!.*,\3\b)),)*([a-z]|[A-Z]|[0-9])+\d*$/,
                message: 'Values must be different and correct format ',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <InputForm
                onBlur={onBlur}
                error={errors.states}
                errorMsg={errors.states?.message}
                // helperText="Erorror"
                toolTipValue="Please seperate values by comma"
                sx={{ width: '100%' }}
                label="States"
                size="small"
                onChange={onChange}
              />
            )}
          />
        </div>
        <div style={{ margin: '20px 0' }}>
          <Controller
            name="alphabets"
            control={control}
            rules={{
              required: 'Fields can not be empty',
              pattern: {
                value:
                  /^(((([a-z]|[A-Z]|[0-9])+\d*)(?!.*,\3\b)),)*([a-z]|[A-Z]|[0-9])+\d*$/,
                message: 'Values must be different and correct format ',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <InputForm
                onBlur={onBlur}
                error={errors.alphabets}
                errorMsg={errors.alphabets?.message}
                toolTipValue="Please seperate values by comma. Note: If you want to input Epsilon please use Capital E "
                sx={{ width: '100%' }}
                label="Alphabet"
                size="small"
                onChange={onChange}
              />
            )}
          />
        </div>
        <div style={{ margin: '20px 0', display: 'flex' }}>
          <Box sx={{ minWidth: 120, flex: 1, mr: 2 }}>
            <Controller
              name="initialState"
              control={control}
              rules={{
                required: 'Fields can not be empty',
              }}
              render={({ field: { onChange, onBlur } }) => (
                <SelectForm
                  onBlur={onBlur}
                  error={errors.initialState}
                  errorMsg={errors.initialState?.message}
                  multiple={false}
                  size="small"
                  label="Initial State"
                  options={getArrayFromValues(watch('states'))}
                  onChange={(event, reason, details) => onChange(reason)}
                />
              )}
            />
          </Box>
          <Box sx={{ minWidth: 120, flex: 1 }}>
            <Controller
              name="endStates"
              control={control}
              rules={{
                required: 'Fields can not be empty',
              }}
              render={({ field: { onChange, onBlur } }) => (
                <SelectForm
                  onBlur={onBlur}
                  error={errors.endStates}
                  errorMsg={errors.endStates?.message}
                  multiple={true}
                  size="small"
                  label="End States"
                  options={getArrayFromValues(watch('states'))}
                  onChange={(event, reason, details) => onChange(reason)}
                />
              )}
            />
          </Box>
        </div>

        {watch('states') &&
          watch('alphabets') &&
          watch('initialState') &&
          watch('endStates') &&
          watch('endStates').length > 0 && (
            <TransitionForm
              control={control}
              states={watch('states')}
              alphabets={watch('alphabets')}
            />
          )}
      </form>
      <ValidateChecked
        states={watch('states')}
        alphabets={watch('alphabets')}
        initialState={watch('initialState')}
        endStates={watch('endStates')}
      />
    </>
  );
};

export default FormFields;
