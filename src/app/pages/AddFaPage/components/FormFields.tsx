import React, { useState } from 'react';
import { Box, Divider, Grid, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import InputForm from './Fields/InputForm';
import SelectForm from './Fields/SelectForm';
import Title from './Title';
import TransitionForm from './TransitionForm';

import {
  getArrayFromValues,
  getDefaultValuesFromFaData,
} from 'utils/form-utils';

const FormFields = ({ faData, onSubmit }) => {
  const location = useLocation();

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: getDefaultValuesFromFaData(faData),
  });

  const [isGenerated, setIsGenerated] = useState(faData ? true : false);
  const resetTransition = () => {
    let inputted =
      getValues('states') &&
      getValues('symbols') &&
      getValues('startState') &&
      getValues('endStates') &&
      getValues('endStates').length > 0;

    if (inputted) {
      setValue('endStates', getValues().endStates);
      setValue('startState', getValues().startState);
      setValue('states', getValues().states);
      setValue('symbols', getValues().symbols);
      setValue('title', getValues().title);

      if (!isGenerated) {
        setIsGenerated(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Title control={control} />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: '12px' }} />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
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
              render={({ field: { onChange, onBlur, value } }) => (
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
                  value={value}
                />
              )}
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <Controller
              name="symbols"
              control={control}
              rules={{
                required: 'Fields can not be empty',
                pattern: {
                  value:
                    /^(((([a-z]|[A-Z]|[0-9])+\d*)(?!.*,\3\b)),)*([a-z]|[A-Z]|[0-9])+\d*$/,
                  message: 'Values must be different and correct format ',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputForm
                  onBlur={onBlur}
                  error={errors.symbols}
                  errorMsg={errors.symbols?.message}
                  toolTipValue="Please seperate values by comma. Note: If you want to input Epsilon please use Capital E "
                  sx={{ width: '100%' }}
                  label="Alphabet"
                  size="small"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div style={{ margin: '20px 0', display: 'flex' }}>
            <Box sx={{ minWidth: 120, flex: 1, mr: 2 }}>
              {location.pathname !== '/add' ? (
                <Controller
                  name="startState"
                  control={control}
                  rules={{
                    required: 'Fields can not be empty',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <SelectForm
                      onBlur={onBlur}
                      error={errors.startState}
                      errorMsg={errors.startState?.message}
                      multiple={false}
                      size="small"
                      label="Initial State"
                      options={getArrayFromValues(watch('states'))}
                      onChange={(event, reason, details) => onChange(reason)}
                      value={value}
                    />
                  )}
                />
              ) : (
                <Controller
                  name="startState"
                  control={control}
                  rules={{
                    required: 'Fields can not be empty',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <SelectForm
                      onBlur={onBlur}
                      error={errors.startState}
                      errorMsg={errors.startState?.message}
                      multiple={false}
                      size="small"
                      label="Initial State"
                      options={getArrayFromValues(watch('states'))}
                      onChange={(event, reason, details) => onChange(reason)}
                    />
                  )}
                />
              )}
            </Box>
            <Box sx={{ minWidth: 120, flex: 1 }}>
              {location.pathname !== '/add' ? (
                <Controller
                  name="endStates"
                  control={control}
                  rules={{
                    required: 'Fields can not be empty',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <SelectForm
                      onBlur={onBlur}
                      error={errors.endStates}
                      errorMsg={(errors.endStates as any)?.message}
                      multiple={true}
                      size="small"
                      label="End States"
                      options={getArrayFromValues(watch('states'))}
                      onChange={(event, reason, details) => onChange(reason)}
                      value={value}
                    />
                  )}
                />
              ) : (
                <Controller
                  name="endStates"
                  control={control}
                  rules={{
                    required: 'Fields can not be empty',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <SelectForm
                      onBlur={onBlur}
                      error={errors.endStates}
                      errorMsg={(errors.endStates as any)?.message}
                      multiple={true}
                      size="small"
                      label="End States"
                      options={getArrayFromValues(watch('states'))}
                      onChange={(event, reason, details) => onChange(reason)}
                    />
                  )}
                />
              )}
            </Box>
          </div>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: 'white' }}
            onClick={() => resetTransition()}
          >
            {isGenerated ? 'RESET TRANSITIONS' : 'GENERATE TRANSITION'}
          </Button>
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          {isGenerated &&
            getValues('states') &&
            getValues('symbols') &&
            getValues('startState') &&
            getValues('endStates') &&
            getValues('endStates').length > 0 && (
              <TransitionForm
                control={control}
                states={getValues('states')}
                symbols={getValues('symbols')}
              />
            )}
        </Grid>
      </Grid>
    </form>
  );
};

export default FormFields;
