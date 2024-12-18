// // src/views/profile/ChangePassword.js

// import React, { useState } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormLabel,
//   CFormInput,
//   CRow,
//   CInputGroup,
//   CInputGroupText,
//   CSpinner,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked } from '@coreui/icons'
// import { toast } from 'react-toastify'
// import { useUpdateUserMutation } from '../../app/service/usersApiSlice'
// import { useDispatch } from 'react-redux'
// import { setCredentials } from '../../app/features/auth/authSlice'

// const ChangePassword = () => {
//   const dispatch = useDispatch()

//   const [currentPassword, setCurrentPassword] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const [confirmNewPassword, setConfirmNewPassword] = useState('')

//   const [updatedUser, { isLoading }] = useUpdateUserMutation()

//   const submitHandler = async (e) => {
//     e.preventDefault()

//     if (newPassword !== confirmNewPassword) {
//       return toast.error('New Password and Confirm password are not the same')
//     }

//     if (currentPassword === newPassword) {
//       return toast.error("Current Password and New Password can't be the same")
//     }

//     try {
//       const res = await updatedUser({ currentPassword, newPassword }).unwrap()
//       dispatch(setCredentials({ ...res }))
//       setCurrentPassword('')
//       setNewPassword('')
//       setConfirmNewPassword('')
//       toast.success('Password Updated Successfully!')
//     } catch (err) {
//       toast.error(err?.data?.message || err.error)
//     }
//   }

//   return (
//     <div className="bg-body-tertiary d-flex flex-row align-items-center">
//       <CContainer style={{ left: '0px' }}>
//         <CRow className="justify-content-center">
//           <CCol md={6}>
//             <CCard>
//               <CCardBody>
//                 <CForm onSubmit={submitHandler}>
//                   <h1 className="text-center">Change Password</h1>
//                   <p className="text-body-secondary">Update your password</p>
//                   <CRow className="mb-3">
//                     <CCol>
//                       <CFormLabel htmlFor="currentPassword">Current Password</CFormLabel>
//                       <CInputGroup className="mb-3">
//                         <CInputGroupText>
//                           <CIcon icon={cilLockLocked} />
//                         </CInputGroupText>
//                         <CFormInput
//                           type="password"
//                           id="currentPassword"
//                           placeholder="Current Password"
//                           minLength={8}
//                           value={currentPassword}
//                           onChange={(e) => setCurrentPassword(e.target.value)}
//                           required
//                         />
//                       </CInputGroup>
//                     </CCol>
//                   </CRow>
//                   <CRow className="mb-3">
//                     <CCol>
//                       <CFormLabel htmlFor="newPassword">New Password</CFormLabel>
//                       <CInputGroup className="mb-3">
//                         <CInputGroupText>
//                           <CIcon icon={cilLockLocked} />
//                         </CInputGroupText>
//                         <CFormInput
//                           type="password"
//                           id="newPassword"
//                           placeholder="New Password"
//                           minLength={8}
//                           value={newPassword}
//                           onChange={(e) => setNewPassword(e.target.value)}
//                           required
//                         />
//                       </CInputGroup>
//                     </CCol>
//                   </CRow>
//                   <CRow className="mb-3">
//                     <CCol>
//                       <CFormLabel htmlFor="confirmNewPassword">Confirm New Password</CFormLabel>
//                       <CInputGroup className="mb-3">
//                         <CInputGroupText>
//                           <CIcon icon={cilLockLocked} />
//                         </CInputGroupText>
//                         <CFormInput
//                           type="password"
//                           id="confirmNewPassword"
//                           placeholder="Confirm New Password"
//                           minLength={8}
//                           value={confirmNewPassword}
//                           onChange={(e) => setConfirmNewPassword(e.target.value)}
//                           required
//                         />
//                       </CInputGroup>
//                     </CCol>
//                   </CRow>
//                   <div className="d-grid">
//                     <CButton type="submit" color="primary" disabled={isLoading}>
//                       {isLoading ? <CSpinner size="sm" /> : 'Change Password'}
//                     </CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default ChangePassword

// src/views/profile/ChangePassword.js

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
  CInputGroup,
  CInputGroupText,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { toast } from 'react-toastify'
import { useUpdatePasswordMutation } from '../../app/service/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../app/features/auth/authSlice'

const ChangePassword = () => {
  const dispatch = useDispatch()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmNewPassword) {
      return toast.error('New Password and Confirm password are not the same')
    }

    if (currentPassword === newPassword) {
      return toast.error("Current Password and New Password can't be the same")
    }

    try {
      const res = await updatePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }).unwrap()
      dispatch(setCredentials({ ...res.user }))
      console.log(res)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      toast.success('Password Updated Successfully!')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="bg-body-tertiary d-flex flex-row align-items-center">
      <CContainer style={{ left: '0px' }}>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard>
              <CCardBody>
                <CForm onSubmit={submitHandler}>
                  <h1 className="text-center">Change Password</h1>
                  <p className="text-body-secondary">Update your password</p>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="currentPassword">Current Password</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="currentPassword"
                          placeholder="Current Password"
                          minLength={8}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="newPassword">New Password</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="newPassword"
                          placeholder="New Password"
                          minLength={8}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="confirmNewPassword">Confirm New Password</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="confirmNewPassword"
                          placeholder="Confirm New Password"
                          minLength={8}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton type="submit" color="primary" disabled={isLoading}>
                      {isLoading ? <CSpinner size="sm" /> : 'Change Password'}
                    </CButton>
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

export default ChangePassword
