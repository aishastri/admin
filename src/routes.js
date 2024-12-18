import React from 'react'
import Profile from './views/profile/Profile'
import ChangePassword from './views/profile/ChangePassword'
// import { element } from 'prop-types'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Customers = React.lazy(() => import('./views/customers/Customer.js'))

// const Upload = React.lazy(() => import('./views/upload/Upload.js'))
const History = React.lazy(() => import('./views/history/History.js'))
const AddCustomer = React.lazy(() => import('./views/customers/AddCustomer.js'))
const ViewCustomer = React.lazy(() => import('./views/customers/ViewCustomer.js'))
const EmailSetup = React.lazy(() => import('./views/emailSetup/EmailSetup.js'))
const Compare = React.lazy(() => import('./views/history/Compare.js'))
const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/change-password', name: 'Change Password', element: ChangePassword },

  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/customers/addCustomer', name: 'Add Customer', element: AddCustomer },
  { path: '/customers/:id', name: 'View Customer', element: ViewCustomer },

  { path: '/history', name: 'History', element: History },
  { path: '/history/compare/:id', name: 'Compare', element: Compare },
  { path: '/email-setup', name: 'IMAP Settings', element: EmailSetup },
]

export default routes
