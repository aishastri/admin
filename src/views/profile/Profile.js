// src/views/profile/Profile.js

import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useUpdateUserMutation } from '../../app/service/usersApiSlice'
import { setCredentials } from '../../app/features/auth/authSlice'
import { toast } from 'react-toastify'

const Profile = () => {
  const user = useSelector((state) => state.auth.userInfo)

  const [updatedUser, { isLoading }] = useUpdateUserMutation()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await updatedUser(userData).unwrap()
      dispatch(setCredentials({ ...res.user }))

      toast.success('Profile Updated Successfully!')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  return (
    <div className="bg-body-tertiary d-flex flex-row align-items-center justify-content-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Profile</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      required
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <div className="d-grid mb-3">
                    <CButton type="submit" color="success" disabled={isLoading}>
                      {isLoading ? <CSpinner size="sm" /> : 'Update'}
                    </CButton>
                  </div>
                  <Link to={'/dashboard'}>
                    <div className="d-grid">
                      <CButton color="secondary">Cancel</CButton>
                    </div>
                  </Link>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Profile
