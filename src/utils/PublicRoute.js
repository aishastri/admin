import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, setCredentials } from '../app/features/auth/authSlice'
import Spinner from './Spinner'
import { fetchUserData } from './Requests'

const PublicRoute = ({ children }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true)
      try {
        const userData = await fetchUserData()
        console.log(userData)
        if (userData?.user?.role === 'admin') {
          dispatch(setCredentials(userData.user)) // Update Redux store with user data
          setIsAuthenticated(true)
          return
        } else {
          dispatch(logout())
          setIsError(true)
        }
      } catch (error) {
        dispatch(logout())
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [dispatch])

  if (isLoading) return <Spinner />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  if (isError) return children
}

export default PublicRoute
