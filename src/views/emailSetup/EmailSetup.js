import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CAlert,
  CSpinner,
  CContainer,
  CRow,
  CCol,
  CTooltip,
  CInputGroup,
  CInputGroupText,
  CBadge,
  CCardHeader,
  CImage,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilEnvelopeClosed,
  cilLockLocked,
  cilInfo,
  cilCheckCircle,
  cilWarning,
  cilArrowRight,
  cilX,
} from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../../app/features/auth/authSlice'

const EmailSetup = () => {
  const [provider, setProvider] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [step, setStep] = useState(1)
  const [confirmRemove, setConfirmRemove] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userInfo)
  const isMailStatus = user?.emailConfigurations?.isActive

  useEffect(() => {
    if (isMailStatus) {
      setStep(3)
      setEmail(user?.emailConfigurations?.email || '')
    }
  }, [isMailStatus, user])

  const providers = {
    google: {
      name: 'Google',
      icon: 'https://img.icons8.com/color/48/google-logo.png',
      imapHost: 'imap.gmail.com',
      port: 993,
      instructions: [
        'Go to your Google Account settings',
        'Enable 2-Step Verification if not already enabled',
        'Go to Security → App passwords',
        'Select "Mail" and your device',
        'Generate and copy the 16-character app password',
      ],
      imapSetup: [
        'Make sure IMAP is enabled in Gmail settings:',
        '1. Open Gmail',
        '2. Click Settings (gear icon) → See all settings',
        '3. Go to "Forwarding and POP/IMAP"',
        '4. Enable IMAP access',
      ],
    },
    godaddy: {
      name: 'GoDaddy',
      icon: 'https://img.icons8.com/ios/50/godaddy.png',
      imapHost: 'imap.secureserver.net',
      port: 993,
      instructions: [
        'Use your email address and email password',
        "If you don't remember your password, you can reset it through GoDaddy's Email & Office dashboard",
      ],
      imapSetup: [
        'IMAP is enabled by default for GoDaddy email accounts',
        "Make sure you're using your complete email address and password",
      ],
    },
  }

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const isFormValid = () => {
    return provider && validateEmail(email) && validatePassword(password)
  }

  const handleRemove = async () => {
    if (!confirmRemove) {
      setConfirmRemove(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/remove-imap-connection`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to remove email connection')
      }

      // Update Redux store
      dispatch(
        setCredentials({
          ...user,
          emailConfigurations: { ...user.emailConfigurations, isActive: false },
        }),
      )

      setStep(1)
      setEmail('')
      setPassword('')
      setProvider('')
      setStatus({ type: 'success', message: 'Email account successfully removed' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setIsLoading(false)
      setConfirmRemove(false)
    }
  }

  const handleTestConnection = async () => {
    if (!isFormValid()) {
      setStatus({
        type: 'error',
        message: 'Please check your email and password format',
      })
      return
    }

    setIsLoading(true)
    setStatus({ type: '', message: '' })

    const selectedProvider = providers[provider]

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/test-imap-connection`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            host: selectedProvider.imapHost,
            port: selectedProvider.port,
            provider,
          }),
          credentials: 'include',
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Connection failed')
      }

      // Update Redux store with new email configuration
      dispatch(
        setCredentials({
          ...user,
          emailConfigurations: {
            ...data.emailConfigurations,
            isActive: true,
          },
        }),
      )

      setStatus({
        type: 'success',
        message: 'Connection successful! Your email account is now connected.',
      })
      setStep(3)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="d-flex justify-content-center mb-4">
      {[1, 2, 3].map((s) => (
        <div key={s} className="d-flex align-items-center">
          <div
            className={`rounded-circle d-flex align-items-center justify-content-center
            ${s === step ? 'bg-primary' : s < step ? 'bg-success' : 'bg-light'}
            ${s === step ? 'border-primary' : 'border-secondary'}
            border text-white`}
            style={{ width: '32px', height: '32px' }}
          >
            {s < step ? <CIcon icon={cilCheckCircle} size="sm" /> : s}
          </div>
          {s < 3 && (
            <div
              className={`mx-2 flex-grow-1
              ${s < step ? 'bg-success' : 'bg-light'}`}
              style={{ height: '2px', width: '50px' }}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderProvider = () => (
    <div className="mb-4">
      <h4 className="mb-3">Select Email Provider</h4>
      <div className="d-flex gap-3 flex-wrap">
        {Object.entries(providers).map(([key, value]) => (
          <CButton
            key={key}
            color={provider === key ? 'primary' : 'light'}
            className={`d-flex align-items-center p-3 flex-grow-1
            ${provider === key ? '' : 'border'}`}
            onClick={() => {
              setProvider(key)
              setStep(2)
            }}
          >
            <img
              src={value.icon}
              alt={value.name}
              className="me-2"
              style={{ width: '24px', height: '24px' }}
            />
            <span>{value.name}</span>
            {provider === key && <CIcon icon={cilCheckCircle} className="ms-2" />}
          </CButton>
        ))}
      </div>
    </div>
  )

  const renderCredentialsForm = () => (
    <CRow>
      <CCol md={6}>
        <h4 className="mb-3">Enter Credentials</h4>
        <CRow className="g-3">
          <CCol xs={12}>
            <CFormLabel>Email Address</CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilEnvelopeClosed} />
              </CInputGroupText>
              <CFormInput
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setStatus({ type: '', message: '' })
                }}
                placeholder="Enter your email address"
                invalid={email && !validateEmail(email)}
              />
            </CInputGroup>
            {email && !validateEmail(email) && (
              <div className="text-danger small mt-1">Please enter a valid email address</div>
            )}
          </CCol>

          <CCol xs={12}>
            <CFormLabel>
              {provider === 'google' ? 'App Password' : 'Password'}
              <CTooltip
                content={
                  provider === 'google'
                    ? 'Use the App Password generated from your Google Account'
                    : 'Enter your email account password'
                }
              >
                <CIcon icon={cilInfo} className="ms-2" size="sm" />
              </CTooltip>
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setStatus({ type: '', message: '' })
                }}
                placeholder={
                  provider === 'google' ? 'Enter your app password' : 'Enter your password'
                }
                invalid={password && !validatePassword(password)}
              />
            </CInputGroup>
            {password && !validatePassword(password) && (
              <div className="text-danger small mt-1">Password must be at least 8 characters</div>
            )}
          </CCol>

          <CCol xs={12}>
            <div className="d-flex align-items-center bg-light p-2 rounded">
              <div className="small">
                <div>IMAP Server: {providers[provider].imapHost}</div>
                <div>Port: {providers[provider].port}</div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCol>

      <CCol md={6}>
        <CCard className="shadow-sm border-0">
          <CCardHeader className="d-flex align-items-center">
            <CImage
              src={providers[provider].icon}
              alt={`${providers[provider].name} logo`}
              className="me-3"
              width={32}
              height={32}
            />
            <h5 className="mb-0">{providers[provider].name} Setup Instructions</h5>
          </CCardHeader>
          <CCardBody>
            <div className="mb-4">
              <h6>IMAP Configuration:</h6>
              <CListGroup>
                {providers[provider].imapSetup.map((step, index) => (
                  <CListGroupItem key={`imap-${index}`}>{step}</CListGroupItem>
                ))}
              </CListGroup>
            </div>

            {provider === 'google' && (
              <div className="mb-4">
                <h6>App Password Setup:</h6>
                <CListGroup>
                  {providers[provider].instructions.map((step, index) => (
                    <CListGroupItem key={`app-${index}`}>{step}</CListGroupItem>
                  ))}
                </CListGroup>
              </div>
            )}

            {provider === 'godaddy' && (
              <div className="text-warning">
                <CIcon icon={cilWarning} className="me-2" />
                <strong>Note:</strong> Ensure you're using your complete email address and password
                for GoDaddy email accounts.
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )

  const renderSuccess = () => (
    <div className="text-center py-4">
      <div className="mb-3">
        <CIcon icon={cilCheckCircle} size="3xl" className="text-success" />
      </div>
      <h4 className="mb-2">Setup Complete!</h4>
      <p className="text-muted mb-4">{email ? email : 'Your'} has been successfully connected.</p>
      {user?.emailConfigurations && user?.emailConfigurations?.lastSyncedAt && (
        <p className="text-muted mb-4">
          Last Sync: {new Date(user.emailConfigurations.lastSyncedAt).toLocaleString()}
        </p>
      )}
      <CBadge color="success" className="px-3 py-2">
        Ready to use
      </CBadge>
      <br className="d-none d-md-block" />

      <CButton
        className="px-3 py-2 mt-3 mt-md-4"
        color={confirmRemove ? 'danger' : 'secondary'}
        onClick={handleRemove}
        disabled={isLoading}
      >
        {isLoading ? (
          <CSpinner size="sm" />
        ) : confirmRemove ? (
          <>
            <CIcon icon={cilX} className="me-2" />
            Confirm Removal
          </>
        ) : (
          'Remove Account'
        )}
      </CButton>
    </div>
  )

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={8}>
          <div className="text-center mb-4">
            <h2 className="mb-2">Email Setup Wizard</h2>
            <p className="text-muted">Connect your email account in just a few steps</p>
          </div>

          {renderStepIndicator()}

          <CCard className="shadow-lg border-0">
            <CCardBody className="p-4">
              <CForm className="needs-validation">
                {step === 1 && renderProvider()}
                {step === 2 && provider && renderCredentialsForm()}
                {((step === 3 && status.type === 'success') || isMailStatus) && renderSuccess()}

                {status.message && (
                  <CAlert
                    color={status.type === 'error' ? 'danger' : 'success'}
                    className="d-flex align-items-center mt-3"
                  >
                    <CIcon
                      icon={status.type === 'error' ? cilWarning : cilCheckCircle}
                      className="flex-shrink-0 me-2"
                    />
                    <div>{status.message}</div>
                  </CAlert>
                )}

                {step === 2 && (
                  <div className="d-grid gap-2 mt-4">
                    <CButton
                      color="primary"
                      onClick={handleTestConnection}
                      disabled={!isFormValid() || isLoading}
                      className="py-2"
                    >
                      {isLoading ? (
                        <>
                          <CSpinner size="sm" className="me-2" />
                          Testing Connection...
                        </>
                      ) : (
                        <>
                          Test Connection
                          <CIcon icon={cilArrowRight} className="ms-2" />
                        </>
                      )}
                    </CButton>
                    <CButton
                      variant="ghost"
                      color="secondary"
                      onClick={() => {
                        setStep(1)
                        setStatus({ type: '', message: '' })
                      }}
                      className="text-primary"
                    >
                      Change Provider
                    </CButton>
                  </div>
                )}
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default EmailSetup
