import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../app/features/auth/authSlice'
import { useLogoutUserMutation } from '../../app/service/usersApiSlice'

import { toast } from 'react-toastify'
import { useState } from 'react'

const linkStyle = {
  textDecoration: 'none', // Remove underline
  color: 'inherit', // Inherit text color
}

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.userInfo)
  console.log(user)
  const firstLetter = user?.name ? user?.name.charAt(0).toUpperCase() : ''

  const [logoutUser] = useLogoutUserMutation()

  const logoutHandler = async () => {
    try {
      const res = await logoutUser().unwrap()
      // console.log('logout status', res)
      if (res.status == 'success') {
        dispatch(logout())
        navigate('/login')
        toast.success('Logout Sucessful!')
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          style={{
            width: '48px',
            height: '48px',
            fontSize: '32px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          color="primary"
          textColor="white"
        >
          {firstLetter}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => navigate('/profile')} style={linkStyle}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem onClick={() => navigate('/profile/change-password')} style={linkStyle}>
          <CIcon icon={cilSettings} className="me-2" />
          Change Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={logoutHandler} style={{ ...linkStyle, textDecoration: 'none' }}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
