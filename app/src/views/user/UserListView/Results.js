import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Link as RouterLink
} from 'react-router-dom';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Create as PencilIcon
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  avatar: {
    marginRight: theme.spacing(2),
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main
  },
  status: {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    backgroundColor: 'green'
  },
  statusInactive: {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    backgroundColor: 'red'
  }
}));

const Results = (
  {
    className,
    records,
    selectedRecordsIds,
    setselectedRecordsIds,
    doDelete,
    setDialogConfig,
    ...rest
  }
) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedRecordsIds;

    if (event.target.checked) {
      newselectedRecordsIds = records.map((customer) => customer.id);
    } else {
      newselectedRecordsIds = [];
    }

    setselectedRecordsIds(newselectedRecordsIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRecordsIds.indexOf(id);
    let newselectedRecordsIds = [];

    if (selectedIndex === -1) {
      newselectedRecordsIds = newselectedRecordsIds.concat(selectedRecordsIds, id);
    } else if (selectedIndex === 0) {
      newselectedRecordsIds = newselectedRecordsIds.concat(selectedRecordsIds.slice(1));
    } else if (selectedIndex === selectedRecordsIds.length - 1) {
      newselectedRecordsIds = newselectedRecordsIds.concat(selectedRecordsIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedRecordsIds = newselectedRecordsIds.concat(
        selectedRecordsIds.slice(0, selectedIndex),
        selectedRecordsIds.slice(selectedIndex + 1)
      );
    }

    setselectedRecordsIds(newselectedRecordsIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const doDeleteOne = (record) => {
    doDelete(record.id);
  };

  const handleDelete = (record) => {
    const config = {
      open: true,
      message: `Confirma a exclusão do usuário "${record.name.toUpperCase()}" ?`,
      handleConfirm: doDeleteOne,
      record
    };
    setDialogConfig(config);
  };

  return (
    <>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRecordsIds.length === records.length}
                      color="primary"
                      indeterminate={
                        selectedRecordsIds.length > 0
                        && selectedRecordsIds.length < records.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    Nome
                  </TableCell>
                  <TableCell>
                    Cidade
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Data criação
                  </TableCell>
                  <TableCell>
                    &nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.slice(page * limit, page * limit + limit).map((record) => (
                  <TableRow
                    hover
                    key={record.id}
                    selected={selectedRecordsIds.indexOf(record.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRecordsIds.indexOf(record.id) !== -1}
                        onChange={(event) => handleSelectOne(event, record.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={record.status === 'ACTIVE' ? classes.status : classes.statusInactive}>&nbsp;</div>
                    </TableCell>
                    <TableCell>
                      <Box
                        alignItems="center"
                        display="flex"
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {record.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {record.city}
                    </TableCell>
                    <TableCell>
                      {record.email}
                    </TableCell>
                    <TableCell>
                      {moment(record.craetedAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <RouterLink to={`/app/user/${record.id}`}>
                        <IconButton aria-label="Editar">
                          <PencilIcon />
                        </IconButton>
                      </RouterLink>
                      <IconButton aria-label="Excluir" onClick={() => { handleDelete(record); }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={records.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Registros por página"
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}-${to} de ${count}`;
          }}
        />
      </Card>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  records: PropTypes.array.isRequired,
  selectedRecordsIds: PropTypes.array.isRequired,
  setselectedRecordsIds: PropTypes.func.isRequired,
  doDelete: PropTypes.func,
  setDialogConfig: PropTypes.func
};

export default Results;
