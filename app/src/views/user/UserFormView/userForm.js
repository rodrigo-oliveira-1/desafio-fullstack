import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import ApiService from '../../../services/apiService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  botalSalvarOutro: {
    marginLeft: theme.spacing(2)
  },
  selectField: {
    height: '56px',
    marginTop: theme.spacing(1)
  }
}));

const UserForm = ({ record }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  let initialValues = {
    name: '',
    email: '',
    cpf: '',
    password: '',
    passwordCheck: '',
    bornDate: '',
    street: '',
    number: '',
    neighborhood: '',
    reference: '',
    city: '',
    state: '',
    zipCode: '',
    goToList: true
  };

  const yupSchema = {
    name: Yup.string().max(255).required('O nome é obrigatório'),
    email: Yup.string().email('Informe um email válido').max(255).required('O email é obrigatório'),
    cpf: Yup.string().max(14).required('o CPF é obrigatório'),
    status: Yup.string().max(20).required('Status é obrigatório'),
    password: Yup.string().max(255).required('A senha é obrigatória'),
    passwordCheck: Yup.string().max(255).required('A confirmação de senha é obrigatória'),
    bornDate: Yup.date().required('Data de nascimento é obrigatório'),
    street: Yup.string().max(60).required('O nome do lagradouro é obrigatório'),
    number: Yup.string().max(6).required('O número do logradouro é obrigatório'),
    neighborhood: Yup.string().max(60).required('O bairro é obrigatório'),
    reference: Yup.string().max(60).required('Um ponto e referência é obrigatório'),
    city: Yup.string().max(60).required('O nome da cidade é obrigatório'),
    state: Yup.string().max(60).required('A UF é obrigatória'),
    zipCode: Yup.number().max(99999999).required('O CEP da rua é obrigatório'),
  };

  if (record) {
    initialValues = record;

    delete yupSchema.cpf;
    delete yupSchema.email;
    delete yupSchema.password;
    delete yupSchema.passwordCheck;
  } else {
    delete yupSchema.status;
  }

  const validateRule = (values) => {
    const errors = {};
    // Só valida senha caso seja inclusão de usuário
    if (!record) {
      if (!(values.passwordCheck === values.password)) {
        errors.passwordCheck = 'As senhas não coincidem';
      }
    }

    return errors;
  };

  const submitForm = async (values, formik) => {
    console.log('envinado');
    const apiService = new ApiService();
    try {
      setErrorMessage('');
      await apiService.save(values);
      if (values.goToList) {
        navigate('/app/users', { replace: true });
      } else {
        formik.resetForm();
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const response = error.response.data;
        if (error.response.status < 500) {
          setErrorMessage(response.error);
        } else {
          setErrorMessage('Algo deu errado, tente novamente.');
        }
      }
    }
  };

  return (
    <Container maxWidth="md">
      {errorMessage && (
        <Box mb={3}>
          <Alert severity="error" onClose={() => { setErrorMessage(''); }}>
            <AlertTitle>Erro</AlertTitle>
            {errorMessage}
          </Alert>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            { }
          </Typography>
        </Box>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={
          Yup.object().shape(yupSchema)
        }
        validate={validateRule}
        onSubmit={submitForm}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values
        }) => (
          <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              label="Nome"
              margin="normal"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              variant="outlined"
            />
            {!record && (
              <>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Endereço de email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <Box display="flex">
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Senha"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.passwordCheck && errors.passwordCheck)}
                    fullWidth
                    helperText={touched.passwordCheck && errors.passwordCheck}
                    label="Confirme a senha"
                    margin="normal"
                    name="passwordCheck"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordCheck}
                    variant="outlined"
                  />
                </Box>
              </>
            )}
            <>
              <Box display="flex">
                <TextField
                  error={Boolean(touched.cpf && errors.cpf)}
                  fullWidth
                  disabled={record}
                  helperText={touched.cpf && errors.cpf}
                  label="CPF"
                  margin="normal"
                  name="cpf"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cpf}
                  variant="outlined"
                />
                {record && (
                  <>
                    <Select
                      className={classes.selectField}
                      fullWidth
                      error={Boolean(touched.status && errors.status)}
                      value={values.status}
                      label="Status"
                      helperText={touched.status && errors.status}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{
                        name: 'status'
                      }}
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="ACTIVE">ATIVO</MenuItem>
                      <MenuItem value="DEACTIVED">DESATIVADO</MenuItem>
                    </Select>
                  </>
                )}
                <TextField
                  error={Boolean(touched.bornDate && errors.bornDate)}
                  fullWidth
                  helperText={touched.bornDate && errors.bornDate}
                  label="Data nascimento"
                  margin="normal"
                  name="bornDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bornDate}
                  variant="outlined"
                />
              </Box>
              <Box display="flex">
                <TextField
                  error={Boolean(touched.street && errors.street)}
                  fullWidth
                  helperText={touched.street && errors.street}
                  label="Logradouro (Rua, Avenida, etc.)"
                  margin="normal"
                  name="street"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.street}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.number && errors.number)}
                  helperText={touched.number && errors.number}
                  label="Número"
                  margin="normal"
                  name="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.number}
                  variant="outlined"
                />
              </Box>
              <Box display="flex">
                <TextField
                  error={Boolean(touched.neighborhood && errors.neighborhood)}
                  fullWidth
                  helperText={touched.neighborhood && errors.neighborhood}
                  label="Bairro"
                  margin="normal"
                  name="neighborhood"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.neighborhood}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.reference && errors.reference)}
                  fullWidth
                  helperText={touched.reference && errors.reference}
                  label="Referência"
                  margin="normal"
                  name="reference"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.reference}
                  variant="outlined"
                />
              </Box>
              <Box display="flex">
                <TextField
                  error={Boolean(touched.city && errors.city)}
                  fullWidth
                  helperText={touched.city && errors.city}
                  label="Cidade"
                  margin="normal"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.state && errors.state)}
                  fullWidth
                  helperText={touched.state && errors.state}
                  label="Estado"
                  margin="normal"
                  name="state"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.zipCode && errors.zipCode)}
                  fullWidth
                  helperText={touched.zipCode && errors.zipCode}
                  label="CEP"
                  margin="normal"
                  name="zipCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.zipCode}
                  variant="outlined"
                />
              </Box>
            </>
            <Box my={2} display="flex">
              <Button
                color="secondary"
                disabled={isSubmitting}
                size="large"
                variant="contained"
                onClick={(e) => {
                  setFieldValue('goToList', true, false);
                  handleSubmit(e);
                }}
              >
                Salvar
              </Button>

              {!record
                && (
                  <>
                    <Button
                      className={classes.botalSalvarOutro}
                      color="secondary"
                      disabled={isSubmitting}
                      size="large"
                      onClick={(e) => {
                        setFieldValue('goToList', false, false);
                        handleSubmit(e);
                      }}
                      variant="outlined"
                    >
                      Salvar e adicionar outro
                    </Button>
                  </>
                )}
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

UserForm.propTypes = {
  record: PropTypes.object
};

export default UserForm;
