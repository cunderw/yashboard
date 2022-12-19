import React, { ReactNode } from 'react';
import Header from './Header';
import Box from '@mui/material/Box';

type Props = {
  children: ReactNode
  openAddAppModal: Function
}

const Layout: React.FC<Props> = ({ children, openAddAppModal }) => {
  return (
    <div>
      <Header openAddAppModal={openAddAppModal}/>
      <Box sx={{ m:0.5 }}>
        {children}
      </Box>
    </div>
  )
}

export default Layout;
