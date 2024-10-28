import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const MessageDialog = ({ setOpenConfig, openConfig }) => {
  const handleClose = () => {
    setOpenConfig({ open: false });
  };

  const handleClickYes = () => {
    openConfig.handleConfirm(openConfig.record);
    setOpenConfig({ open: false });
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openConfig.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Aguardando confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {openConfig.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary" autoFocus>
            Não
          </Button>
          <Button onClick={handleClickYes} variant="contained" color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

MessageDialog.propTypes = {
  setOpenConfig: PropTypes.func,
  openConfig: PropTypes.object
};

export default MessageDialog;
