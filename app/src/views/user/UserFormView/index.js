import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles,
  Card,
  Typography
} from '@material-ui/core';
import ArrowbackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from 'src/components/Page';
import UserForm from './userForm';
import ApiService from '../../../services/apiService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  boxLoad: {
    height: 400,
  }
}));

const UserFormView = () => {
  const classes = useStyles();
  const [userRecord, setUserRecord] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  // const { loading, setLoading } = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (userId) {
        const apiService = new ApiService();
        try {
          const result = await apiService.getUser(userId);
          setUserRecord(result.data);
        } catch (error) {
          console.log(error.response);
        }
      }
    }
    loadUser();
  }, []);

  let content;
  if (userId && !userRecord) {
    content = (
      <Box display="flex" flexDirection="column" alignItems="center" className={classes.boxLoad}>
        <Box flexGrow={1} display="flex" alignItems="inherit">
          <CircularProgress size={80} />
        </Box>
      </Box>
    );
  } else {
    content = (
      <>
        <Box display="flex" alignItems="center">
          <Box ml={2}>
            <IconButton aria-label="Excluir" onClick={() => { navigate('/app/users'); }}>
              <ArrowbackIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box mb={3} p={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              {!userRecord && 'Novo usuário'}
              {userRecord && 'Editar usuário'}
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Informe os dados e clique no botão salvar ao fim da página
            </Typography>
          </Box>
        </Box>
        <UserForm record={userRecord} />
      </>
    );
  }

  return (
    <Page
      className={classes.root}
      title="Usuário"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            { content }
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default UserFormView;
