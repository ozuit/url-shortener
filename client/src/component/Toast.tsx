import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

export type ToastProps = {
  severity?: 'success' | 'info' | 'warning' | 'error';
  message?: string;
  visible: boolean;
  onClose?: () => void;
};

const ToastMessage: FC<ToastProps> = ({
  visible,
  severity,
  message,
  onClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={visible}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default ToastMessage;
