import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function SimpleSnackbar() {
  const [open, setOpen] = useState(false);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a simple Snackbar!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default SimpleSnackbar;
