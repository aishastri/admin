// import React, { useState } from 'react';
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CButton,
//   CFormInput,
//   CAlert,
//   CProgress,
// } from '@coreui/react';
// import { cilCloudUpload } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import { useUploadMutation } from '../../app/service/uploadApiSlice';
// import {toast} from "react-toastify"
// import { useNavigate } from 'react-router-dom';

// const FileUploadComponent = () => {
//   const [file, setFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState('');
//   const [progress, setProgress] = useState(0);

//   const navigate =useNavigate();

//   const [upload, { isLoading }] = useUploadMutation();

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     setProgress(0); // Reset progress bar
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setUploadMessage('Please select a file to upload.');
//       return;
//     }

//     const form = new FormData();
//     form.append('file', file);
//     form.append('input', "Upload");

//     try {
//       // Show progress simulation
//       setProgress(20);

//       let count = 0;  // Initialize loop counter
//       // Start progress simulation
//       const interval = setInterval(() => {
//         setProgress((prevProgress) => {
//           const newProgress = prevProgress + 10;
//           return newProgress >= 80 ? 80 : newProgress; // Cap at 80%
//         });  // Ensure max progress is 50
//         count++;

//         if (count >= 5) clearInterval(interval);  // Stop after 5 updates
//       }, 5000);

//       // Perform upload
//       const response = await upload(form).unwrap();
//       console.log(response);
//       clearInterval(interval);
//       setProgress(100);
//  toast.success("File uploaded successfully!")
//       navigate('/history')

//       // Clear file input after upload
//       setFile(null);
//     } catch (err) {
//       console.error('Upload failed', err);
//       toast.error("Upload failed. Please try again.")
//       setProgress(0);

//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center">
//       <CCard className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
//         <CCardHeader className="text-center">
//           <h4 className="mb-0">File Upload</h4>
//         </CCardHeader>
//         <CCardBody className="p-4">
//           <div
//             className="rounded mb-3 p-4 text-center form-control"
//             style={{ border: '3px dashed rgb(170, 167, 162)' }}
//           >
//             {/* File Input */}
//             <CFormInput
//               type="file"
//               id="fileInput"
//               accept=".pdf,.jpg,.jpeg,.png"
//               onChange={handleFileChange}
//               className="d-none"
//             />
//             <label htmlFor="fileInput" className="cursor-pointer">
//               <CIcon icon={cilCloudUpload} size="4xl" className="text-primary mb-3" />
//               {file ? (
//                 <p className="text-muted">{file.name}</p>
//               ) : (
//                 <p className="text-muted">
//                   Drag & drop a file here or <a className="ms-2">click to upload</a>
//                 </p>
//               )}
//             </label>
//           </div>

//           {/* Progress Bar */}
//           {progress > 0 && (
//             <CProgress animated striped='true' color="primary" value={progress} className="mb-3" />
//           )}

//           {/* Upload Button */}
//           <CButton
//             color="primary"
//             className="w-100 mb-2"
//             onClick={handleUpload}
//             disabled={!file || isLoading}
//           >
//             {isLoading ? 'Uploading...' : 'Upload File'}
//           </CButton>

//         </CCardBody>
//       </CCard>
//     </div>
//   );
// };

// export default FileUploadComponent;

import React, { useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormInput,
  CAlert,
  CProgress,
  CSpinner,
  CBadge,
  CTooltip,
} from '@coreui/react'
import { cilCloudUpload, cilWarning, cilCheckCircle, cilFile } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useUploadMutation } from '../../app/service/uploadApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FileUploadComponent = () => {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef(null)

  const navigate = useNavigate()
  const [upload, { isLoading }] = useUploadMutation()

  // Allowed file types and max size (5MB)
  const ALLOWED_TYPES = ['.pdf', '.jpg', '.jpeg', '.png']
  const MAX_FILE_SIZE = 5 * 1024 * 1024

  const validateFile = (file) => {
    setFileError('')

    if (!file) return false

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()

    if (!ALLOWED_TYPES.includes(fileExtension)) {
      setFileError(`Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`)
      return false
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be less than 5MB')
      return false
    }

    return true
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (validateFile(selectedFile)) {
      setFile(selectedFile)
      setProgress(0)
    } else {
      setFile(null)
      event.target.value = ''
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFile = e.dataTransfer.files[0]
    if (validateFile(droppedFile)) {
      setFile(droppedFile)
      setProgress(0)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.')
      return
    }

    const form = new FormData()
    form.append('file', file)
    form.append('input', 'Upload')

    try {
      // Start progress animation
      let progressInterval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 15
          const newProgress = prev + increment
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 1000)

      const response = await upload(form).unwrap()

      clearInterval(progressInterval)
      setProgress(100)

      toast.success('File uploaded successfully!', {
        icon: '🎉',
      })

      setTimeout(() => {
        navigate('/history')
      }, 1500)

      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      console.error('Upload failed', err)
      toast.error(err.data?.message || 'Upload failed. Please try again.')
      setProgress(0)
    }
  }

  const getFileIcon = () => {
    if (!file) return cilCloudUpload
    const extension = file.name.split('.').pop().toLowerCase()
    switch (extension) {
      case 'pdf':
        return cilFile
      case 'jpg':
      case 'jpeg':
      case 'png':
        return cilFile
      default:
        return cilFile
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <CCard className="shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <CCardHeader className="text-center bg-primary text-white">
          <h4 className="mb-0">File Upload</h4>
        </CCardHeader>
        <CCardBody className="p-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`rounded mb-3 p-4 text-center form-control position-relative ${
              dragActive ? 'bg-light border-primary' : ''
            }`}
            style={{
              border: '3px dashed rgb(170, 167, 162)',
              transition: 'all 0.3s ease',
            }}
          >
            <CFormInput
              type="file"
              id="fileInput"
              ref={fileInputRef}
              accept={ALLOWED_TYPES.join(',')}
              onChange={handleFileChange}
              className="d-none"
            />
            <label htmlFor="fileInput" className="cursor-pointer w-100">
              <CIcon
                icon={getFileIcon()}
                size="4xl"
                className={`mb-3 ${file ? 'text-success' : 'text-primary'}`}
              />
              {file ? (
                <div>
                  <p className="text-success mb-1">
                    <CIcon icon={cilCheckCircle} className="me-2" />
                    File selected
                  </p>
                  <p className="text-muted small mb-0">
                    {file.name}
                    <CBadge color="info" className="ms-2">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </CBadge>
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-muted mb-1">Drag & drop a file here or click to upload</p>
                  <p className="text-muted small mb-0">
                    Supported formats: PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
              )}
            </label>
          </div>

          {fileError && (
            <CAlert color="danger" className="d-flex align-items-center mb-3">
              <CIcon icon={cilWarning} className="flex-shrink-0 me-2" />
              <div>{fileError}</div>
            </CAlert>
          )}

          {progress > 0 && (
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <small>Uploading...</small>
                <small>{Math.round(progress)}%</small>
              </div>
              <CProgress
                animated
                striped
                color={progress === 100 ? 'success' : 'primary'}
                value={progress}
              />
            </div>
          )}

          <CButton
            color="primary"
            className="w-100 d-flex justify-content-center align-items-center"
            onClick={handleUpload}
            disabled={!file || isLoading}
          >
            {isLoading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Uploading...
              </>
            ) : (
              <>
                <CIcon icon={cilCloudUpload} className="me-2" />
                Upload File
              </>
            )}
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default FileUploadComponent
