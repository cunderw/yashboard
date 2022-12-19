import React, { ReactNode } from 'react'
import Header from './Header'
import Box from '@mui/material/Box'

type Props = {
  children: ReactNode
  openAddAppModal: Function
  isEditMode: boolean
  enableEditMode: Function
  disableEditMode: Function
}

const Layout: React.FC<Props> = props => {
  return (
    <div>
      <Header
        openAddAppModal={props.openAddAppModal}
        isEditMode={props.isEditMode}
        enableEditMode={props.enableEditMode}
        disableEditMode={props.disableEditMode}
      />
      <Box sx={{ m: 0.5 }}>{props.children}</Box>
    </div>
  )
}

export default Layout
