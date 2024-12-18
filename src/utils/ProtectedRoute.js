// import { Outlet, Navigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

// import { useDispatch } from 'react-redux'
// import { setCredentials } from '../app/features/auth/authSlice'
// import { useGetUserMutation } from '../app/service/usersApiSlice'
// import Loading from '../views/Loading';

// const ProtectedRoute = () => {
//   const [loading,setLoading] =useState(true)

//   const { isAuthenticated } = useSelector((state) => state.auth)
//   // console.log(isAuthenticated)

//   const dispatch = useDispatch()

//   const [getUser] = useGetUserMutation()

//   useEffect(() => {
//     //setLoading(true)
//     const fetchData = async () => {
//       try {
//         const res = await getUser().unwrap();
//         // console.log(res)
//         if (res?.status === 'success') {
//           // console.log('authenticated')
//           dispatch(setCredentials(res.user))
//         }

//       } catch (e) {
//         console.log(e)
//       } finally{
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [dispatch,getUser])

//   if (loading){
//     return <Loading />
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />
// }

// export default ProtectedRoute

import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setCredentials } from '../app/features/auth/authSlice'
import Spinner from './Spinner'
import { fetchUserData } from './Requests'

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth.userInfo)
  const businessId = userInfo?.name // Assuming businessId is part of userInfo
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const initializeData = async () => {
      try {
        if (!userInfo) {
          // Fetch user data if not already in Redux
          const userData = await fetchUserData()
          console.log(userData.user.role)
          if (userData.user.role == 'admin') {
            console.log('yes')
            dispatch(setCredentials(userData.user))
          } else {
            setIsError(true)
          }
        }

        setIsLoading(false)
      } catch (error) {
        dispatch(logout())
        setIsError(true)
        setIsLoading(false)
      }
    }

    initializeData()
  }, [dispatch, userInfo, businessId])

  if (isLoading) return <Spinner />
  if (isError) return <Navigate to={redirectPath} replace />

  return userInfo ? <Outlet /> : <Spinner />
}

export default ProtectedRoute
