import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
type Props = {
  children: ReactNode;
  open: boolean;
  handleClose: Function;
  title: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  justifyContent: 'center',
  boxShadow: 24,
  p: 4,
};

const PopupModal: React.FC<Props> = (props) => {
  const { open, handleClose, children, title } = props;
  const close = () => handleClose();
  return (
    <Modal
      open={open}
      onClose={close}
    >
      <Box sx={style}>
        <Typography variant="h3" component="div">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}

export default PopupModal;
