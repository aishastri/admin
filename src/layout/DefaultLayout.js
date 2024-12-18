import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const DefaultLayout = () => {
  // const { isAuthenticated } = useSelector((state) => state.auth)
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />
  // }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
export default DefaultLayout
