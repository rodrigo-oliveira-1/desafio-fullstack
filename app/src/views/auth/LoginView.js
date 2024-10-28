import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Card from '@material-ui/core/Card';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ApiService from '../../services/apiService';
import LocalStorageService from '../../services/localStorageService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    backgroundImage: 'url("/static/images/background.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paddingCard: {
    padding: theme.spacing(4)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const initialValues = {
    email: LocalStorageService.getUser()?.email || '',
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Card className={classes.paddingCard} raised>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Informe um endereço de email válido').max(255).required('O Email é obrigatório'),
                password: Yup.string().max(255).required('A senha é obrigatória')
              })}
              onSubmit={async (values) => {
                const apiService = new ApiService();
                try {
                  setErrorMessage('');
                  const result = await apiService.login(values.email, values.password);
                  LocalStorageService.setToken(result.data.accessToken);
                  LocalStorageService.setUser(result.data.user);
                  navigate('/app/users', { replace: true });
                } catch (error) {
                  LocalStorageService.setToken(false);
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
                      Entre
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Faça login na sua conta com seu endereço de email
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
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />

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
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      ENTRAR
                    </Button>
                  </Box>
                  <Typography
                    color="error"
                    gutterBottom
                    variant="body2"
                  >
                    Primero acesso? (Utilize: jhon@doe.com senha: 123456)
                  </Typography>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
