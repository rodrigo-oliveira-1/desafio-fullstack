import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  Card
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Page from 'src/components/Page';
import ApiService from '../../services/apiService';
import LocalStorageService from '../../services/localStorageService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    backgroundImage: 'url("https://images.unsplash.com/photo-1541795795328-f073b763494e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  card: {
    padding: theme.spacing(2)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const validateRule = (values) => {
    const errors = {};

    if (!(values.passwordCheck === values.password)) {
      errors.passwordCheck = 'As senhas não coincidem';
    }

    return errors;
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        justifyContent="center"
      >
        <Card className={classes.card} raised>
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: '',
                nome: '',
                sobrenome: '',
                password: '',
                passwordCheck: '',
                politica: false
              }}
              validationSchema={
                Yup.object().shape({
                  nome: Yup.string().max(255).required('O nome é obrigatório'),
                  sobrenome: Yup.string().max(255).required('o sobrenome é obrigatório'),
                  email: Yup.string().email('Informe um email válido').max(255).required('O email é obrigatório'),
                  password: Yup.string().min(6, 'Mínimo de 6 caracteres').max(12, 'Máximo de 12 caracteres').required('A senha é obrigatória'),
                  passwordCheck: Yup.string().min(6, 'Mínimo de 6 caracteres').max(12, 'Máximo de 12 caracteres').required('A confirmação de senha é obrigatória'),
                  politica: Yup.boolean().oneOf([true], 'Marque que aceita as políticas do site')
                })
              }
              validate={validateRule}
              onSubmit={async (values) => {
                const apiService = new ApiService();
                try {
                  setErrorMessage('');
                  const result = await apiService.signIn(values);
                  LocalStorageService.setUser({ email: result.data.email });
                  navigate('/login', { replace: true });
                } catch (error) {
                  if (error.response) {
                    const response = error.response.data;
                    if (error.response.status < 500) {
                      setErrorMessage(response.error);
                    } else {
                      setErrorMessage('Algo deu errado, tente novamente.');
                    }
                  }
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Crie sua conta
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Informe seus dados e clique em &ldquo;criar agora&ldquo;
                    </Typography>
                  </Box>
                  {errorMessage && (
                  <Box mb={3}>
                    <Alert severity="error" onClose={() => { setErrorMessage(''); }}>
                      <AlertTitle>Erro</AlertTitle>
                      {errorMessage}
                    </Alert>
                  </Box>
                  )}
                  <TextField
                    error={Boolean(touched.nome && errors.nome)}
                    fullWidth
                    helperText={touched.nome && errors.nome}
                    label="Nome"
                    margin="normal"
                    name="nome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nome}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.sobrenome && errors.sobrenome)}
                    fullWidth
                    helperText={touched.sobrenome && errors.sobrenome}
                    label="Sobrenome"
                    margin="normal"
                    name="sobrenome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sobrenome}
                    variant="outlined"
                  />
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
                  <Box
                    alignItems="center"
                    display="flex"
                    ml={-1}
                  >
                    <Checkbox
                      checked={values.politica}
                      name="politica"
                      onChange={handleChange}
                    />
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Eu li e aceito os
                      {' '}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Termos e Condições
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.politica && errors.politica) && (
                    <FormHelperText error>
                      {errors.politica}
                    </FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      CRIAR AGORA
                    </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Já tem uma conta?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="h6"
                    >
                      Entre
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Card>
      </Box>
    </Page>
  );
};

export default RegisterView;
