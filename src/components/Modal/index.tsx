import React from 'react';

import {
  Box,
  Zoom,
  Dialog,
  Button,
  IconButton,
  DialogContent,
  Typography,
  CircularProgress,
  type Transitions as TransitionProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
    easing?: string;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

// --------------------------------------------------

const RootStyle = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-rounded': {
    overflowY: 'inherit',
    borderRadius: 20,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  }
}));

const StyledModalContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&.MuiPaper-rounded': {
    borderRadius: 0
  }
}));

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: theme.spacing(2),
  marginTop: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'end',
    flexDirection: 'row',
    rowGap: theme.spacing(0)
  }
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'transparent',
  [theme.breakpoints.up('sm')]: {
    top: theme.spacing(-2.5),
    right: theme.spacing(-2.5),
    backgroundColor: theme.palette.grey[300],
    '&:hover': {
      backgroundColor: theme.palette.grey[400]
    }
  }
}));

// --------------------------------------------------

interface ModalProps {
  text?: string;
  title?: string;
  children?: React.ReactNode;
  open?: boolean;
  isLoading?: boolean;
  hasCloseButton?: boolean;
  okButtonText?: string;
  cancelButtonText?: string;
  hasActionButtons?: boolean;
  onOk?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
}

const Modal = ({
  text = '',
  title = '',
  children = null,
  open = false,
  isLoading = false,
  hasCloseButton = false,
  okButtonText = 'Aceptar',
  hasActionButtons = true,
  cancelButtonText = 'Cancelar',
  onOk = () => {},
  onClose = () => {},
  onCancel = () => {},
  ...props
}: ModalProps) => {
  const handleOk = () => {
    onOk();
  };
  const handleClose = () => {
    onClose();
  };
  const handleCancel = () => {
    onCancel();
  };
  return (
    <RootStyle
      open={open}
      maxWidth="md"
      TransitionComponent={Transition as any}
      onClose={handleClose}
      {...props}
    >
      {hasCloseButton && (
        <StyledCloseButton onClick={handleClose}>
          <Close />
        </StyledCloseButton>
      )}
      <StyledModalContent>
        {title !== '' && (
          <Typography variant="h6" mt={2}>
            {title}
          </Typography>
        )}
        {text !== '' && (
          <Typography variant="body1" mt={3}>
            {text}
          </Typography>
        )}
        {children}
        {hasActionButtons && (
          <StyledButtonContainer>
            <Button
              variant="contained"
              sx={{ mr: { sm: 2 } }}
              onClick={handleOk}
            >
              {okButtonText}
              {isLoading && (
                <CircularProgress size={20} sx={{ ml: 1, color: 'white' }} />
              )}
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              {cancelButtonText}
            </Button>
          </StyledButtonContainer>
        )}
      </StyledModalContent>
    </RootStyle>
  );
};

export default Modal;
