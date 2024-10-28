import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  deleteButton: {
    marginRight: theme.spacing(3)
  }
}));

const Toolbar = ({
  className,
  selectedRecordsIds,
  doDelete,
  setDialogConfig,
  setQuery,
  ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const doDeleteMany = () => {
    doDelete(selectedRecordsIds);
  };

  const handleDeleteMany = () => {
    const config = {
      open: true,
      message: `Confirma a exclusão do(s) ${selectedRecordsIds.length} registro(s) selecionado(s) ?`,
      handleConfirm: doDeleteMany
    };
    setDialogConfig(config);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="row">
              <Box maxWidth={500} width={500}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Pesquisar por nome, sobrenome ou email..."
                  variant="outlined"
                  onChange={handleChange}
                />
              </Box>
              <Box flexGrow={1}>
                  &nbsp;
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignSelf="flex-end"
              >
                {selectedRecordsIds.length > 0
                && (
                <Button
                  className={classes.deleteButton}
                  color="primary"
                  variant="contained"
                  onClick={() => { handleDeleteMany(); }}
                >
                  Excluir
                </Button>
                )}
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => navigate('/app/user', { replace: true })}
                >
                  + Usuário
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  selectedRecordsIds: PropTypes.array.isRequired,
  doDelete: PropTypes.func,
  setDialogConfig: PropTypes.func,
  setQuery: PropTypes.func
};

export default Toolbar;
