// import React, { useState, useEffect } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CTable,
//   CTableHead,
//   CTableBody,
//   CTableRow,
//   CTableHeaderCell,
//   CTableDataCell,
//   CButton,
//   CFormSelect,
//   CFormLabel,
//   CModal,
//   CModalHeader,
//   CModalBody,
//   CModalTitle,
//   CImage,
//   CSpinner,
// } from '@coreui/react'
// import ReactJson from 'react-json-view' // Import the library
// import Papa from 'papaparse'
// import Loading from '../Loading'
// import { Link } from 'react-router-dom'
// import { useGetHistoryMutation } from '../../app/service/uploadApiSlice'

// const HistoryPage = () => {
//   const [historyData, setHistoryData] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage, setItemsPerPage] = useState(10)

//   const [showModal, setShowModal] = useState(false)
//   const [selectedFileUrl, setSelectedFileUrl] = useState('')
//   const [selectedFileType, setSelectedFileType] = useState('')

//   const [jsonData, setJsonData] = useState(null)
//   const [jsonModal, setJsonModal] = useState(false)

//   const [csvData, setCsvData] = useState('') // Store CSV content
//   const [showCsvModal, setShowCsvModal] = useState(false)

//   const [getHistory, { isLoading }] = useGetHistoryMutation()

//   useEffect(() => {
//     // Fetch the saved data from your backend (API endpoint)
//     const fetchData = async () => {
//       try {
//         const response = await getHistory().unwrap()
//         // console.log(response)
//         setHistoryData(response.data) // Set the data from API response
//       } catch (err) {
//         console.error('Error fetching data:', err)
//       }
//     }

//     fetchData() // Call the function to fetch data
//   }, []) // Empty dependency array means it runs only once when the component mounts

//   // Detect duplicate file names
//   const detectDuplicates = (data) => {
//     const seenFiles = new Set()
//     return data.map((item, index) => {
//       if (seenFiles.has(item.fileName)) {
//         return { ...item, isDuplicate: true }
//       } else {
//         seenFiles.add(item.fileName)
//         return { ...item, isDuplicate: false }
//       }
//     })
//   }

//   const processedData = detectDuplicates(historyData)

//   // Calculate the number of pages
//   const totalPages = Math.ceil(processedData.length / itemsPerPage)

//   // Get current data slice based on pagination
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   // const currentData = processedData.slice(indexOfFirstItem, indexOfLastItem)
//   const currentData = historyData.slice(indexOfFirstItem, indexOfLastItem)

//   // Handle page changes
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   // Handle items per page change
//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value))
//     setCurrentPage(1) // Reset to the first page
//   }

//   // Handle Previous and Next buttons
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const handleViewFile = (url, type) => {
//     setSelectedFileUrl(url)
//     setSelectedFileType(type)
//     setShowModal(true)
//   }

//   // Fetch JSON data from the URL
//   const fetchJsonData = async (jsonUrl) => {
//     try {
//       // const response = await fetch(jsonUrl);
//       const response = await fetch(jsonUrl)
//       const data = await response.json()
//       setJsonData(data)
//       setJsonModal(true) // Open modal after fetching data
//     } catch (error) {
//       console.error('Error fetching JSON:', error)
//     }
//   }

//   // Flatten a nested JSON object
//   const flattenObject = (obj, parentKey = '', result = {}) => {
//     for (let key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         const newKey = parentKey ? `${parentKey}.${key}` : key

//         if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
//           flattenObject(obj[key], newKey, result) // Recurse for nested objects
//         } else if (Array.isArray(obj[key])) {
//           // Handle arrays (flatten them as well)
//           obj[key].forEach((item, index) => {
//             flattenObject(item, `${newKey}[${index}]`, result)
//           })
//         } else {
//           result[newKey] = obj[key] // Base case: add key-value pair
//         }
//       }
//     }
//     return result
//   }

//   // Function to fetch JSON data and convert to CSV
//   const handleCsvConversion = async (jsonUrl) => {
//     try {
//       const response = await fetch(jsonUrl) // Fetch JSON from Cloudinary

//       if (!response.ok) {
//         throw new Error('Failed to fetch data')
//       }

//       const jsonData = await response.json()

//       console.log('jsonData', jsonData)

//       // // Convert JSON data to CSV format
//       const csv = Papa.unparse(jsonData)
//       console.log('csv', csv)

//       setCsvData(csv) // Store CSV data
//       setShowCsvModal(true) // Open modal to display CSV
//     } catch (error) {
//       console.error('Error fetching or converting JSON:', error)
//     }
//   }

//   // Render UI based on loading state, error state, or data
//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
//         <CSpinner color="primary" />
//       </div>
//     )
//   }

//   return (
//     <div className="w-100">
//       <CCard className="">
//         <CCardHeader className="d-flex align-items-center justify-content-between">
//           <h4 className="mb-0">History</h4>
//           <div className="d-flex align-items-center justify-content-between gap-3">
//             <CFormLabel>Documents per page</CFormLabel>
//             <CFormSelect
//               value={itemsPerPage}
//               onChange={handleItemsPerPageChange}
//               style={{ width: '72px' }}
//             >
//               <option value="10">10 </option>
//               <option value="25">25 </option>
//               <option value="50">50</option>
//             </CFormSelect>
//           </div>
//         </CCardHeader>
//         <CCardBody className="">
//           {/* Responsive Table */}
//           <CTable bordered hover responsive striped>
//             <CTableHead>
//               <CTableRow>
//                 <CTableHeaderCell>File Name</CTableHeaderCell>
//                 <CTableHeaderCell className="col-2">Date & Time</CTableHeaderCell>
//                 <CTableHeaderCell>Format</CTableHeaderCell>
//                 <CTableHeaderCell className="col-1">Size</CTableHeaderCell>
//                 <CTableHeaderCell>Input</CTableHeaderCell>
//                 <CTableHeaderCell className="col-1">Processing Time</CTableHeaderCell>

//                 <CTableHeaderCell className="col-1">Unfinished Content</CTableHeaderCell>
//                 <CTableHeaderCell>Action</CTableHeaderCell>
//               </CTableRow>
//             </CTableHead>
//             <CTableBody>
//               {currentData.length === 0 ? (
//                 <CTableRow>
//                   <CTableDataCell colSpan="8" className="text-center text-muted">
//                     No Data Available
//                   </CTableDataCell>
//                 </CTableRow>
//               ) : (
//                 <>
//                   {currentData
//                     .slice() // Create a copy to avoid mutating the original array
//                     .reverse() // Reverse the order of the copied array
//                     .map((item, index) => (
//                       <CTableRow key={index}>
//                         <CTableDataCell>{item.fileName}</CTableDataCell>
//                         {item.isDuplicate ? (
//                           <>
//                             <CTableDataCell colSpan={6} className="text-center text-danger">
//                               Duplicate document inserted
//                             </CTableDataCell>
//                             <CTableDataCell>
//                               <CButton
//                                 color="primary"
//                                 size="sm"
//                                 className="mr-2"
//                                 onClick={() => handleViewFile(item.document, item.format)} // Pass URL and format
//                               >
//                                 Document
//                               </CButton>
//                             </CTableDataCell>
//                           </>
//                         ) : (
//                           <>
//                             <CTableDataCell>
//                               {new Date(item?.createdAt).toLocaleString()}
//                             </CTableDataCell>
//                             <CTableDataCell>{item?.format}</CTableDataCell>
//                             <CTableDataCell>{item?.size}</CTableDataCell>
//                             <CTableDataCell>{item?.input ? item.input : 'Email'}</CTableDataCell>
//                             <CTableDataCell>{item?.processingTime}</CTableDataCell>
//                             <CTableDataCell>{item?.unfinishedContent || 'content'}</CTableDataCell>

//                             <CTableDataCell>
//                               <div className="d-flex align-items-center justify-content-between gap-2">
//                                 <CButton
//                                   color="primary"
//                                   size="sm"
//                                   className="mr-2"
//                                   onClick={() => handleViewFile(item.document, item.format)} // Pass URL and format
//                                 >
//                                   Document
//                                 </CButton>
//                                 <Link to={item?.csv}>
//                                   <CButton color="info" size="sm" className="mr-2">
//                                     CSV
//                                   </CButton>
//                                 </Link>
//                                 <CButton
//                                   color="warning"
//                                   size="sm"
//                                   className="mr-2"
//                                   onClick={() => fetchJsonData(item.json)} // Call function on click
//                                 >
//                                   JSON
//                                 </CButton>
//                                 <Link
//                                   className="text-decaration-none"
//                                   to={`/history/compare/${item._id}`}
//                                 >
//                                   <CButton color="danger" size="sm">
//                                     {/* <span icon={cilCompare} className="mr-2" />  */}
//                                     Compare
//                                   </CButton>
//                                 </Link>
//                               </div>
//                             </CTableDataCell>
//                           </>
//                         )}
//                       </CTableRow>
//                     ))}
//                 </>
//               )}
//             </CTableBody>
//           </CTable>

//           {/* Pagination Controls */}
//           <div className="d-flex justify-content-end mt-3">
//             <CButton
//               color="secondary"
//               size="sm"
//               className="mx-1"
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//             >
//               &lt; Previous
//             </CButton>

//             {Array.from({ length: totalPages }, (_, i) => (
//               <CButton
//                 key={i + 1}
//                 color={currentPage === i + 1 ? 'primary' : 'secondary'}
//                 size="sm"
//                 className="mx-1"
//                 onClick={() => handlePageChange(i + 1)}
//               >
//                 {i + 1}
//               </CButton>
//             ))}

//             <CButton
//               color="secondary"
//               size="sm"
//               className="mx-1"
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//             >
//               Next &gt;
//             </CButton>
//           </div>
//         </CCardBody>
//       </CCard>

//       {/* Modal to Display File */}
//       <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg">
//         <CModalHeader onClose={() => setShowModal(false)}>
//           <CModalTitle>View Document</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           {selectedFileType === 'pdf' ? (
//             <iframe
//               src={selectedFileUrl}
//               title="PDF Viewer"
//               style={{ width: '100%', height: '500px', border: 'none' }}
//             />
//           ) : (
//             <CImage src={selectedFileUrl} alt="Document" fluid />
//           )}
//         </CModalBody>
//       </CModal>

//       {/* Modal to display JSON data */}
//       <CModal visible={jsonModal} onClose={() => setJsonModal(false)} size="lg">
//         <CModalBody>
//           {jsonData ? (
//             <ReactJson
//               src={jsonData}
//               theme="monokai" // Stylish theme
//               collapsed={2} // Collapse at 2 levels deep
//               displayDataTypes={false} // Hide data types
//             />
//           ) : (
//             <p>Loading...</p>
//           )}
//         </CModalBody>
//       </CModal>

//       {/* Modal to Display CSV Data */}
//       <CModal visible={showCsvModal} onClose={() => setShowCsvModal(false)} size="lg">
//         <CModalHeader onClose={() => setShowCsvModal(false)}>
//           <CModalTitle>CSV Data</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <div>
//             <textarea rows="10" cols="50" value={csvData} readOnly />
//             <br />
//             <a
//               href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
//               download="data.csv"
//             >
//               Download CSV
//             </a>
//           </div>
//         </CModalBody>
//       </CModal>
//     </div>
//   )
// }

// export default HistoryPage

import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormSelect,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CImage,
  CSpinner,
  CBadge,
  CTooltip,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import ReactJson from 'react-json-view'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'
import { useGetHistoryMutation } from '../../app/service/uploadApiSlice'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
  cilFile,
  cilCheckCircle,
  cilXCircle,
  cilSearch,
  cilFilter,
  cilDataTransferDown,
  cilChart,
  // cilCompare,
} from '@coreui/icons'

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' })
  const [showModal, setShowModal] = useState(false)
  const [selectedFileUrl, setSelectedFileUrl] = useState('')
  const [selectedFileType, setSelectedFileType] = useState('')
  const [jsonData, setJsonData] = useState(null)
  const [jsonModal, setJsonModal] = useState(false)
  const [csvData, setCsvData] = useState('')
  const [showCsvModal, setShowCsvModal] = useState(false)
  const [getHistory, { isLoading }] = useGetHistoryMutation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHistory().unwrap()
        setHistoryData(response.data)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  // Enhanced sorting function
  const sortData = (data) => {
    return [...data].sort((a, b) => {
      if (sortConfig.key === 'createdAt') {
        return sortConfig.direction === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      }
      return sortConfig.direction === 'asc'
        ? a[sortConfig.key] > b[sortConfig.key]
          ? 1
          : -1
        : a[sortConfig.key] < b[sortConfig.key]
        ? 1
        : -1
    })
  }

  // Enhanced search function
  const filterData = (data) => {
    return data.filter(
      (item) =>
        item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.format.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(item.createdAt).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  // Process and paginate data
  const processedData = sortData(filterData(historyData))
  const totalPages = Math.ceil(processedData.length / itemsPerPage)
  const currentData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleViewFile = (url, type) => {
    setSelectedFileUrl(url)
    setSelectedFileType(type)
    setShowModal(true)
  }

  const fetchJsonData = async (jsonUrl) => {
    try {
      const response = await fetch(jsonUrl)
      const data = await response.json()
      setJsonData(data)
      setJsonModal(true)
    } catch (error) {
      console.error('Error fetching JSON:', error)
    }
  }

  const renderFormatBadge = (format) => {
    const formatColors = {
      pdf: 'danger',
      jpg: 'info',
      png: 'success',
      json: 'warning',
      csv: 'primary',
    }
    return (
      <CBadge color={formatColors[format.toLowerCase()] || 'secondary'}>
        {format.toUpperCase()}
      </CBadge>
    )
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <div className="w-100">
      <CCard className="shadow-sm">
        <CCardHeader className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Document History</h4>
            <div className="d-flex gap-3 align-items-center">
              <CInputGroup className="w-auto">
                <CFormInput
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CButton color="primary" variant="outline">
                  <CIcon icon={cilSearch} />
                </CButton>
              </CInputGroup>
              <div className="d-flex align-items-center gap-2">
                <CFormLabel className="mb-0">Per page:</CFormLabel>
                <CFormSelect
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  style={{ width: '80px' }}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </CFormSelect>
              </div>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive className="align-middle">
            <CTableHead>
              <CTableRow className="bg-light">
                <CTableHeaderCell className="cursor-pointer" onClick={() => handleSort('fileName')}>
                  File Name{' '}
                  {sortConfig.key === 'fileName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </CTableHeaderCell>
                <CTableHeaderCell
                  className="cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  Date & Time{' '}
                  {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </CTableHeaderCell>
                <CTableHeaderCell>Format</CTableHeaderCell>
                <CTableHeaderCell>Size</CTableHeaderCell>
                <CTableHeaderCell>Input Type</CTableHeaderCell>
                <CTableHeaderCell>Processing</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="8" className="text-center py-5">
                    <div className="text-muted">
                      <CIcon icon={cilFile} size="xl" className="mb-3" />
                      <p className="mb-0">No documents found</p>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ) : (
                currentData.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <div className="d-flex align-items-center">
                        <CIcon icon={cilFile} className="me-2" />
                        {item.fileName}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      {new Date(item?.createdAt).toLocaleDateString()}
                      <br />
                      <small className="text-muted">
                        {new Date(item?.createdAt).toLocaleTimeString()}
                      </small>
                    </CTableDataCell>
                    <CTableDataCell>{renderFormatBadge(item?.format)}</CTableDataCell>
                    <CTableDataCell>{item?.size}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color="info" className="text-uppercase">
                        {item?.input || 'Email'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <small className="text-muted">{item?.processingTime}</small>
                    </CTableDataCell>
                    <CTableDataCell>
                      {/* <CBadge color={item?.unfinishedContent ? 'warning' : 'success'}> */}
                      {item?.unfinishedContent ? (
                        <img
                          width="30"
                          height="30"
                          src="https://img.icons8.com/color/48/fail.png"
                          alt="fail"
                        />
                      ) : (
                        <img
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency/48/order-completed.png"
                          alt="order-completed"
                        />
                      )}
                      {/* </CBadge> */}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CTooltip content="View Document">
                          <CButton
                            color="primary"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewFile(item.document, item.format)}
                          >
                            <CIcon icon={cilFile} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Download CSV">
                          <CButton color="info" variant="ghost" size="sm" as={Link} to={item?.csv}>
                            <CIcon icon={cilDataTransferDown} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="View JSON">
                          <CButton
                            color="warning"
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchJsonData(item.json)}
                          >
                            <CIcon icon={cilChart} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Compare">
                          <CButton
                            color="danger"
                            variant="ghost"
                            size="sm"
                            as={Link}
                            to={`/history/compare/${item._id}`}
                          >
                            <CIcon icon={cilFilter} />
                            {/* Compare */}
                          </CButton>
                        </CTooltip>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-muted">
              Showing {Math.min(currentData.length, itemsPerPage)} of {processedData.length}{' '}
              documents
            </div>
            <div className="d-flex gap-2">
              <CButton
                color="primary"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </CButton>
              {[...Array(totalPages)].map((_, i) => (
                <CButton
                  key={i}
                  color={currentPage === i + 1 ? 'primary' : 'secondary'}
                  variant={currentPage === i + 1 ? 'solid' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </CButton>
              ))}
              <CButton
                color="primary"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </CButton>
            </div>
          </div>
        </CCardBody>
      </CCard>

      {/* Modals */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size="lg">
        <CModalHeader onClose={() => setShowModal(false)}>
          <CModalTitle>Document Preview</CModalTitle>
        </CModalHeader>
        <CModalBody className="p-0">
          {selectedFileType === 'pdf' ? (
            <iframe
              src={selectedFileUrl}
              title="PDF Viewer"
              className="w-100"
              style={{ height: '600px', border: 'none' }}
            />
          ) : (
            <CImage src={selectedFileUrl} alt="Document" fluid className="w-100" />
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" href={selectedFileUrl} download>
            <CIcon icon={cilCloudDownload} className="me-2" />
            Download
          </CButton>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={jsonModal} onClose={() => setJsonModal(false)} size="lg">
        <CModalHeader onClose={() => setJsonModal(false)}>
          <CModalTitle>JSON Data</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {jsonData ? (
            <ReactJson
              src={jsonData}
              theme="monokai"
              collapsed={2}
              displayDataTypes={false}
              style={{ maxHeight: '600px', overflow: 'auto' }}
            />
          ) : (
            <div className="text-center py-5">
              <CSpinner color="primary" />
            </div>
          )}
        </CModalBody>
      </CModal>

      <CModal visible={showCsvModal} onClose={() => setShowCsvModal(false)} size="lg">
        <CModalHeader onClose={() => setShowCsvModal(false)}>
          <CModalTitle>CSV Preview</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="bg-light p-3 rounded">
            <pre className="m-0" style={{ maxHeight: '400px', overflow: 'auto' }}>
              {csvData}
            </pre>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
            download="document.csv"
          >
            <CIcon icon={cilCloudDownload} className="me-2" />
            Download CSV
          </CButton>
          <CButton
            color="primary"
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
            download="document.csv"
          >
            <CIcon icon={cilCloudDownload} className="me-2" />
            Download CSV
          </CButton>
          <CButton color="secondary" onClick={() => setShowCsvModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default HistoryPage
