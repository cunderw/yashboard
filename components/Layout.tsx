import React, { ReactNode } from 'react';
import Header from './Header';
import Box from '@mui/material/Box';

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Box sx={{ m:0.5 }}>
        {children}
      </Box>
    </div>
  )
}

export default Layout;
