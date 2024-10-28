import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import ApiService from '../../../services/apiService';
import MessageDialog from '../../../util/messageDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(6)
  }
}));

const UserListView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [selectedRecordsIds, setselectedRecordsIds] = useState([]);
  const [query, setQuery] = useState('');
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    message: 'Confirma a exclusão do registro',
    handleConfirm: () => {}
  });

  const loadUsers = async (queryString) => {
    console.log('Carregando usuarios');
    const apiService = new ApiService();
    try {
      const result = await apiService.getUsers(queryString);
      setUsers(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    loadUsers(query);
  }, [query]);

  const doDeleteRecords = async (id) => {
    const apiService = new ApiService();
    try {
      await apiService.removeUser(id);
      await loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const doDeleteOne = (id) => {
    doDeleteRecords(id);
  };

  const doDeleteMany = () => {
    doDeleteRecords(selectedRecordsIds);
    setselectedRecordsIds([]);
  };

  return (
    <Page
      className={classes.root}
      title="Usuários"
    >
      <Container maxWidth={false}>
        <Toolbar
          selectedRecordsIds={selectedRecordsIds}
          doDelete={doDeleteMany}
          setDialogConfig={setDialogConfig}
          setQuery={setQuery}
        />
        <Box mt={3}>
          <Results
            records={users}
            selectedRecordsIds={selectedRecordsIds}
            setselectedRecordsIds={setselectedRecordsIds}
            doDelete={doDeleteOne}
            setDialogConfig={setDialogConfig}
          />
        </Box>
      </Container>
      <MessageDialog
        setOpenConfig={setDialogConfig}
        openConfig={dialogConfig}
      />
    </Page>
  );
};

export default UserListView;
