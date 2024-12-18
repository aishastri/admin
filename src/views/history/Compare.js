// import React, { useState, useEffect } from 'react';
// import { CCard, CCardBody, CCardHeader, CRow, CCol, CButton, CImage, CModal, CModalHeader, CModalBody, CModalTitle } from '@coreui/react';
// import { useGetSingleHistoryMutation } from '../../app/service/uploadApiSlice';
// import { Link, useParams } from 'react-router-dom';
// import Loading from '../Loading';

// const FileAndImageView = () => {
//     const [historyData, setHistoryData] = useState(null);
//     const [documentData, setDocumentData] = useState(null);

//   const [getData,{ error, isLoading }] = useGetSingleHistoryMutation(); // Fetch data using RTK Query hook
//   const [showModal, setShowModal] = useState(false);

//   const { id } = useParams(); // Extract the id from the URL
//   console.log(id)

//   useEffect(() => {
//     // Fetch the saved data from your backend (API endpoint)
//     const fetchData = async () => {
//       try {
//         const response = await getData(id).unwrap();
//         console.log('history',response)
//         setHistoryData(response.data);
//         fetchDocumentData(response.data.json)
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };

//     fetchData(); // Call the function to fetch data
//   }, []); // Empty dependency array means it runs only once when the component mounts

//   const fetchDocumentData = async (url) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setDocumentData(data)
//       console.log("json",data)
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   // Display loading or error states
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Function to recursively render key-value pairs
// const renderKeyValue = (data) => {
//   if (Array.isArray(data)) {
//     return data.map((item, index) => (
//       <div key={index} className='key-value-pair'>
//         <span className=''>
//         {renderKeyValue(item)} {/* Recursively render items */}
//         </span>
//       </div>
//     ));
//   } else if (typeof data === 'object' && data !== null) {
//     return Object.keys(data).map((key) => (
//       <div key={key} className='key-value-pair'>
//         <div className='key-value'>
//           <span className=''>
//             <span className='fw-bold key'>{key}</span>
//             <span className='fw-bold mx-1'>:</span>
//             <span className=' value'>{renderKeyValue(data[key])}</span>
//           </span>
//         </div>

//       </div>
//     ));
//   } else {
//     return <span className='value'>{data}</span>;
//   }
// };

//   return (
//     <div>
//       <CCard className="mb-4">
//         <CCardHeader className='d-flex align-items-center justify-content-between'>
//           <h5>{historyData?.fileName}</h5>
//           <Link to={'/history'}><CButton color="primary" >Back</CButton></Link>
//         </CCardHeader>
//         <CCardBody>
//           <CRow>
//             {/* Image Column */}
//             <CCol sm="8" className=''>
//               {historyData?.format==="pdf" ?(<>
//                 <iframe
//               src={historyData?.document}
//               title="PDF Viewer"
//               style={{ width: '100%', minHeight:"110vh", border: 'none' }}
//             />
//               </>):<CImage src={historyData?.document} alt="Image" fluid style={{ maxHeight: '400px', objectFit: 'cover' }} />}
//             </CCol>

//             <CCol sm="4" className='border rounded '>
//             <div className=' p-2'>
//       {documentData ? (
//         <div>{renderKeyValue(documentData)}</div> // Display key-value pairs
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//             </CCol>
//           </CRow>
//         </CCardBody>
//       </CCard>
//     </div>
//   );
// };

// export default FileAndImageView;

import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CImage,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CSpinner,
  CAlert,
  CTooltip,
  CBadge,
} from '@coreui/react'
import { useGetSingleHistoryMutation } from '../../app/service/uploadApiSlice'
import { Link, useParams } from 'react-router-dom'

const FileAndImageView = () => {
  const [historyData, setHistoryData] = useState(null)
  const [documentData, setDocumentData] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isJsonLoading, setIsJsonLoading] = useState(false)
  const [jsonError, setJsonError] = useState(null)

  const [getData, { error, isLoading }] = useGetSingleHistoryMutation()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(id).unwrap()
        setHistoryData(response.data)
        fetchDocumentData(response.data.json)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [getData, id])

  const fetchDocumentData = async (url) => {
    setIsJsonLoading(true)
    setJsonError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch JSON data')
      }
      const data = await response.json()
      setDocumentData(data)
    } catch (err) {
      setJsonError(err.message)
      console.error('Error fetching JSON data:', err)
    } finally {
      setIsJsonLoading(false)
    }
  }

  const renderKeyValue = (data, depth = 0) => {
    if (Array.isArray(data)) {
      return (
        <div className="ms-3">
          {data.map((item, index) => (
            <div key={index} className="my-2">
              <CBadge color="info" className="me-2">
                {index + 1}
              </CBadge>
              {renderKeyValue(item, depth + 1)}
            </div>
          ))}
        </div>
      )
    } else if (typeof data === 'object' && data !== null) {
      return Object.entries(data).map(([key, value]) => (
        <div key={key} className="my-2">
          <div className="d-flex align-items-start">
            <span className="fw-bold text-primary me-2">{key}:</span>
            <div className="flex-grow-1">{renderKeyValue(value, depth + 1)}</div>
          </div>
        </div>
      ))
    }
    return <span className="text-dark">{String(data)}</span>
  }

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '400px' }}
      >
        <CSpinner color="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <CAlert color="danger" className="m-3">
        <h4>Error Loading Data</h4>
        <p>{error.message || 'An unexpected error occurred'}</p>
        <Link to="/history">
          <CButton color="danger" variant="outline">
            Return to History
          </CButton>
        </Link>
      </CAlert>
    )
  }

  return (
    <div>
      <CCard className="mb-4 shadow-sm">
        <CCardHeader className="d-flex align-items-center justify-content-between bg-light">
          <div className="d-flex align-items-center">
            <Link to="/history" className="me-3">
              <CButton color="primary" variant="outline">
                <i className="fas fa-arrow-left me-2"></i>Back
              </CButton>
            </Link>
            <h5 className="mb-0">{historyData?.fileName}</h5>
          </div>
          <CBadge color={historyData?.format === 'pdf' ? 'danger' : 'info'}>
            {historyData?.format?.toUpperCase()}
          </CBadge>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6" className="mb-3 mb-sm-0">
              {historyData?.format === 'pdf' ? (
                <div className="pdf-container border rounded">
                  <iframe
                    src={historyData?.document}
                    title="PDF Viewer"
                    style={{ width: '100%', height: '110vh', border: 'none' }}
                    className="rounded"
                  />
                </div>
              ) : (
                <CTooltip content="Click to enlarge">
                  <CImage
                    src={historyData?.document}
                    alt="Document Preview"
                    fluid
                    className="rounded shadow-sm cursor-pointer"
                    style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
                    onClick={() => setShowImageModal(true)}
                  />
                </CTooltip>
              )}
            </CCol>

            <CCol sm="6">
              <CCard className="h-[100%] shadow-sm">
                <CCardHeader className="bg-light">
                  <h6 className="mb-0">Extracted Data</h6>
                </CCardHeader>
                <CCardBody className="overflow-auto">
                  {isJsonLoading ? (
                    <div className="text-center py-4">
                      <CSpinner size="sm" />
                      <p className="mt-2 text-muted">Loading data...</p>
                    </div>
                  ) : jsonError ? (
                    <CAlert color="danger">Failed to load data: {jsonError}</CAlert>
                  ) : documentData ? (
                    <div className="parsed-data">{renderKeyValue(documentData)}</div>
                  ) : (
                    <div className="text-center text-muted py-4">No data available</div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        size="xl"
        fullscreen="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>{historyData?.fileName}</CModalTitle>
        </CModalHeader>
        <CModalBody className="text-center bg-light p-3">
          <CImage
            src={historyData?.document}
            alt="Document Preview"
            fluid
            className="rounded shadow max-height-90vh"
            style={{ maxHeight: '90vh', objectFit: 'contain' }}
          />
        </CModalBody>
      </CModal>
    </div>
  )
}

export default FileAndImageView
