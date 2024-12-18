import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChange, toggleUnfold } from '../app/features/header/toggler'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../_nav'
import { left } from '@popperjs/core'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.header.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.header.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(toggleChange(visible))
      }}
    >
      <CSidebarHeader className=" d-flex align-items-center justify-content-center border-bottom">
        <CSidebarBrand to="/" className="text-decoration-none ">
          <img
            alt="logo"
            src="./focus-logo-white-new.webp"
            width={165.23}
            height={32}
            style={{
              objectFit: 'fit', // Ensures the image scales proportionally
              display: 'block', // Removes inline spacing
              margin: '0', // Resets default margins
            }}
          />

          {/* <div className='fs-2'>AP Sense</div> */}
        </CSidebarBrand>
        <CCloseButton className="d-lg-none" dark onClick={() => dispatch(toggleChange(false))} />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => dispatch(toggleUnfold(!unfoldable))} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
