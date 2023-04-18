import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setAppError } from '../../store/app_reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars() {
//   const [open, setOpen] = React.useState(false);

  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAppError(null))
    // setOpen(false);
  };

  const isOpened = error !== null

  return (
      <Snackbar open={isOpened} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
        </Alert>
      </Snackbar>
  );
}