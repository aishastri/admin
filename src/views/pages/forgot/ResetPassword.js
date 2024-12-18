import React, { useState } from "react";
import swal from 'sweetalert2';
import { useResetMutation } from "../../../app/service/usersApiSlice";
import { useParams,useNavigate } from "react-router-dom";
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

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");
  const [error, setError] = useState("");

  const [Reset, { isLoading }] = useResetMutation()
  const {token} =useParams();
  console.log(token)
const navigate =useNavigate();

  if(isLoading){
    return <>
    {/* <HamsterWheel/> */}
    <h1>Loading</h1>
    </>
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if(password!==conformPassword){
            setError("Password and Conform password are not same")
        }
      const response = await Reset({password,token}).unwrap();
      console.log(response)
      if(response.status==="success"){
        toast.success('Password Reset Successful!.')
        navigate("/login")
    }

    } catch (err) {
      setError("Invalid Data");
    }
  };

  return (
    // <div className="container ">
    //   <div className="form-container ">
     
    //   <form onSubmit={handleSubmit} className="form w-100">
    //   <h2 className="mb-3 text-primary">Reset Password</h2>
    //   {error && <p className="error text-danger">{error}</p>}
    //   <div className="form-group d-flex align-items-center justify-content-between  w-100">
    //     <label className="form-label w-25">Password:</label>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       className="form-control mb-2"
    //     />
    //   </div>
    //   <div className="form-group d-flex align-items-center justify-content-between  w-100">
    //     <label className="form-label w-25">Confirm Password:</label>
    //     <input
    //       type="password"
    //       placeholder="Confirm Password"
    //       value={conformPassword}
    //       onChange={(e) => setConformPassword(e.target.value)}
    //       className="form-control mb-2"
    //     />
    //   </div>
           
    //     <button type="submit" className="btn btn-primary w-50">
    //     {isLoading ? <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> :<span>Send</span>}
    //     </button>
    //   </form>
    //   </div>
    // </div>
    <div className="bg-body-tertiary d-flex flex-row align-items-center">
      <CContainer style={{ left: '0px',marginTop:"5rem" }}>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1 className="text-center">Reset Password</h1>
                  <p className="text-body-secondary">{error}</p>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="currentPassword">Password</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="currentPassword"
                          placeholder="Current Password"
                          minLength={8}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel htmlFor="newPassword">conform Password</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="newPassword"
                          placeholder="New Password"
                          minLength={8}
                          value={conformPassword}
                          onChange={(e) => setConformPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton type="submit" color="primary" disabled={isLoading}>
                      {isLoading ? <CSpinner size="sm" /> : 'Update'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;
