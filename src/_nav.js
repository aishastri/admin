import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilCloudUpload,
  cilHistory,
  cibMailRu,
  cilPeople,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'History',
  //   to: '/history',
  //   icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Email Config',
  //   to: '/email-setup',
  //   icon: <CIcon icon={cibMailRu} customClassName="nav-icon" />,
  // },

  // {
  //   component: CNavItem,
  //   name: 'Customers',
  //   to: '/customers',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
]

export default _nav
