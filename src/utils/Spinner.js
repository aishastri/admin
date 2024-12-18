import React from 'react'

const spinnerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
}

const loadingSpinnerStyle = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '2px solid #0072c6',
  borderTopColor: 'transparent',
  animation: 'spin 1s linear infinite',
}

const keyframes = `
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`

const Spinner = () => {
  return (
    <div style={spinnerContainerStyle}>
      <style>{keyframes}</style>
      <div style={loadingSpinnerStyle}></div>
    </div>
  )
}

export default Spinner
