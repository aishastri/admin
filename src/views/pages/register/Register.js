import React, { useState, useEffect } from 'react';
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
  CFormCheck,
  CRow,
  CSpinner,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked, cilPhone } from '@coreui/icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../../app/service/usersApiSlice';
import { setCredentials } from '../../../app/features/auth/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      return toast.error('Password and Confirm password are not the same.');
    }

    try {
      const res = await register({ name, email, password, role: 'admin'}).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Sign Up Successful! Welcome to the dashboard. 🚀');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={submitHandler}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your admin account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      minLength={8}
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CFormCheck
                    required
                    className="mb-4"
                    label="I agree with Privacy Policy and Terms of use"
                  />
                  <div className="d-grid mb-3">
                    <CButton color="success" type="submit" disabled={isLoading}>
                      {isLoading ? <CSpinner size="sm" /> : 'Sign Up'}
                    </CButton>
                  </div>
                  <div className="mt-3 text-center">
                    <span>Already have an account? </span>
                    <a href="/login">Sign in</a>
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

export default Register;











// import React, { useState, useEffect } from 'react';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CFormCheck,
//   CRow,
//   CSpinner,
//   CFormSelect,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilUser, cilLockLocked, cilPhone } from '@coreui/icons';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRegisterMutation } from '../../../app/service/usersApiSlice';
// import { setCredentials } from '../../../app/features/auth/authSlice';

// // List of country codes
// const countryCodes = [
//   { code: '+1', name: 'USA' },
//   { code: '+91', name: 'India' },
//   { code: '+44', name: 'UK' },
//   { code: '+61', name: 'Australia' },
//   { code: '+81', name: 'Japan' },
//   { code: '+49', name: 'Germany' },
//   { code: '+86', name: 'China' },
//   { code: '+33', name: 'France' },
//   { code: '+39', name: 'Italy' },
//   { code: '+34', name: 'Spain' },
//   { code: '+7', name: 'Russia' },
//   { code: '+55', name: 'Brazil' },
//   { code: '+27', name: 'South Africa' },
//   { code: '+82', name: 'South Korea' },
//   { code: '+52', name: 'Mexico' },
//   { code: '+64', name: 'New Zealand' },
//   // Add more countries as needed
// ];

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [countryCode, setCountryCode] = useState('+1'); // Default country code

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [register, { isLoading }] = useRegisterMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/dashboard');
//     }
//   }, [userInfo, navigate]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== repeatPassword) {
//       return toast.error('Password and Confirm password are not the same.');
//     }

//     const fullPhoneNumber = `${countryCode}-${phoneNumber}`;

//     try {
//       const res = await register({ name, email, password, role: 'admin', phoneNumber: fullPhoneNumber }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       toast.success('Sign Up Successful! Welcome to the dashboard. 🚀');
//       navigate('/dashboard');
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm onSubmit={submitHandler}>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your admin account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput
//                       placeholder="Name"
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>@</CInputGroupText>
//                     <CFormInput
//                       type="email"
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       minLength={8}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Confirm Password"
//                       minLength={8}
//                       value={repeatPassword}
//                       onChange={(e) => setRepeatPassword(e.target.value)}
//                       required
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText className="p-0" style={{ minWidth: '150px' }}>
//                       <CFormSelect
//                         value={countryCode}
//                         onChange={(e) => setCountryCode(e.target.value)}
//                         required
//                         style={{ border: 'none' }}
//                       >
//                         {countryCodes.map((country) => (
//                           <option key={country.code} value={country.code}>
//                             {country.code} {country.name}
//                           </option>
//                         ))}
//                       </CFormSelect>
//                     </CInputGroupText>
//                     <CFormInput
//                       type="text"
//                       placeholder="Phone Number"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                       required
//                       style={{ flexGrow: 1 }}
//                     />
//                   </CInputGroup>
//                   <CFormCheck
//                     required
//                     className="mb-4"
//                     label="I agree with Privacy Policy and Terms of use"
//                   />
//                   <div className="d-grid mb-3">
//                     <CButton
//                       color="success"
//                       type="submit"
//                       disabled={isLoading}
//                       style={{ boxShadow: 'none' }}
//                     >
//                       {isLoading ? <CSpinner size="sm" /> : 'Sign Up'}
//                     </CButton>
//                   </div>
//                   <div className="mt-3 text-center">
//                     <span>Already have an account? </span>
//                     <a href="/login">Sign in</a>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   );
// };

// export default Register;
