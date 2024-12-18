import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import { useForgotMutation } from '../../../app/service/usersApiSlice'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [forgotPassword, { isLoading }] = useForgotMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting email:', email) // Log the email being submitted
    try {
      const response = await forgotPassword({ email }).unwrap()
      console.log('API response:', response) // Log the API response
      if(response.status==="success"){
        toast.success(response.message)
      }
    } catch (err) {
      console.error('Failed to send password reset email: ', err)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Forgot Password</h1>
                  <p className="text-body-secondary">
                    Enter your email, we will send you Link
                  </p>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="email">Email address</CFormLabel>
                      <CFormInput
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton type="submit" color="primary" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send'}
                    </CButton>
                    <span style={{ marginTop: '10px' }}>
                      If you know your password? Continue to <Link to={'/login'} className='text-decoration-none'>Sign in</Link>
                    </span>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
