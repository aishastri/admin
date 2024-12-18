// src/views/pages/login/Login.js

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useLoginMutation, useGetUserMutation } from '../../../app/service/usersApiSlice'
import { setCredentials } from '../../../app/features/auth/authSlice'
import { toast } from 'react-toastify'
import './Login.css' // Import the custom CSS file
import Loading from '../../Loading'

const Login = () => {
  const [email, setEmail] = useState('naveenpothula2001@gmail.com')
  const [password, setPassword] = useState('57365645')
  const [loading, setLoading] = useState(false)

  console.log(import.meta.env.VITE_BASE_URL)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()
  const [getUser] = useGetUserMutation()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getUser().unwrap()
  //       console.log(res)
  //       if (res.status === 'success') {
  //         navigate('/dashboard')
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [navigate, getUser])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()

      if (res.user.role == 'admin') {
        // console.log(res)
        dispatch(setCredentials({ ...res.user }))
        toast.success('Login Successful! Welcome back!.')
        navigate('/dashboard')
      } else {
        toast.error('you are not an admin')
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <CContainer className="login-container bg-blue-500">
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard className="p-4 login-card">
                <CCardBody>
                  <CForm onSubmit={submitHandler}>
                    <h1 className="login-header">Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3 login-input-group">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email Address"
                        type="text"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4 login-input-group">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        placeholder="Password"
                        required
                      />
                    </CInputGroup>
                    <CRow className="login-button-group">
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? <CSpinner size="sm" /> : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <CButton
                          color="danger"
                          className="px-4"
                          onClick={() => {
                            setEmail('')
                            setPassword('')
                          }}
                        >
                          Cancel
                        </CButton>
                      </CCol>
                    </CRow>
                    {/* <CRow className="login-footer ">
                      <CCol className="text-end">
                        <Link to="/forgot-password" className="">
                          <CButton color="link" className="px-0 text-decoration-none">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow> */}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
