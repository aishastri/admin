// import React, { useEffect, useState } from 'react'

// const Dashboard = () => {
//   const [processedData, setProcessedData] = useState({
//     history_email: 0,
//     history_file: 0,
//     history: 0,
//   })
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchProcessedData = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BASE_URL}/api/v1/upload/processed-documents`,
//           {
//             method: 'GET',
//             credentials: 'include',
//           },
//         )
//         const data = await response.json()
//         if (data.status === 'success') {
//           setProcessedData(data.data)
//         } else {
//           setError('Failed to fetch data.')
//         }
//       } catch (err) {
//         setError('An error occurred while fetching data.')
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProcessedData()
//   }, [])

//   const StatCard = ({ title, value, icon }) => (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-600 text-sm mb-2">{title}</p>
//           <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
//         </div>
//         <div className="text-4xl text-gray-400">{icon}</div>
//       </div>
//     </div>
//   )

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div
//         className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//         role="alert"
//       >
//         <strong className="font-bold">Error: </strong>
//         <span className="block sm:inline">{error}</span>
//       </div>
//     )
//   }

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
//       <div className="bg-white rounded-lg shadow-md mb-8 p-6">
//         <h1 className="text-2xl font-bold text-gray-800">Processing Statistics</h1>
//       </div>

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//           gap: '1.5rem',
//         }}
//       >
//         <StatCard
//           title="Email processed attachements"
//           value={processedData.history_email}
//           icon="📧"
//         />
//         <StatCard title="Manual upload" value={processedData.history_file} icon="📁" />
//         <StatCard title="Total Processed Documents" value={processedData.history} icon="📊" />
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }
//         .animate-spin {
//           animation: spin 1s linear infinite;
//         }
//         .hover\\:shadow-lg:hover {
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//         }
//         .transition-shadow {
//           transition: box-shadow 0.3s ease-in-out;
//         }
//         .bg-white {
//           background-color: white;
//         }
//         .rounded-lg {
//           border-radius: 0.5rem;
//         }
//         .shadow-md {
//           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//         }
//         .text-gray-600 {
//           color: #4b5563;
//         }
//         .text-gray-800 {
//           color: #1f2937;
//         }
//         .text-gray-400 {
//           color: #9ca3af;
//         }
//         .font-bold {
//           font-weight: 700;
//         }
//         .text-sm {
//           font-size: 0.875rem;
//         }
//         .text-2xl {
//           font-size: 1.5rem;
//         }
//         .mb-2 {
//           margin-bottom: 0.5rem;
//         }
//         .mb-8 {
//           margin-bottom: 2rem;
//         }
//         .p-6 {
//           padding: 1.5rem;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Dashboard

// import React, { useEffect, useState, useCallback, useRef } from 'react'

// const Dashboard = () => {
//   const [processedData, setProcessedData] = useState({
//     history_email: 0,
//     history_file: 0,
//     history: 0,
//   })
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [isRefreshing, setIsRefreshing] = useState(false)
//   const mountedRef = useRef(true)

//   const fetchProcessedData = useCallback(async () => {
//     try {
//       setIsRefreshing(true)
//       const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}/api/v1/upload/processed-documents`,
//         {
//           method: 'GET',
//           credentials: 'include',
//         },
//       )

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const data = await response.json()
//       if (data.status === 'success' && mountedRef.current) {
//         setProcessedData(data.data)
//         setError('')
//       } else {
//         throw new Error('Failed to fetch data.')
//       }
//     } catch (err) {
//       if (mountedRef.current) {
//         setError(err.message || 'An error occurred while fetching data.')
//       }
//       console.error('Fetch error:', err)
//     } finally {
//       if (mountedRef.current) {
//         setLoading(false)
//         setIsRefreshing(false)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     fetchProcessedData()

//     return () => {
//       mountedRef.current = false
//     }
//   }, [fetchProcessedData])

//   const StatCard = ({ title, value, icon }) => (
//     <div
//       className="stat-card"
//       style={{
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         padding: '1.5rem',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//         cursor: 'pointer',
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = 'translateY(-2px)'
//         e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)'
//         e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <p
//             style={{
//               color: '#666',
//               fontSize: '0.875rem',
//               marginBottom: '0.5rem',
//               fontWeight: '500',
//             }}
//           >
//             {title}
//           </p>
//           <h3
//             style={{
//               fontSize: '1.5rem',
//               fontWeight: 'bold',
//               margin: '0',
//               color: '#1a1a1a',
//             }}
//           >
//             {value.toLocaleString()}
//           </h3>
//         </div>
//         <div
//           style={{
//             fontSize: '2rem',
//             color: '#666',
//             backgroundColor: '#f5f5f5',
//             padding: '0.75rem',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   )

//   const LoadingSpinner = () => (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '400px',
//       }}
//     >
//       <div
//         style={{
//           width: '48px',
//           height: '48px',
//           border: '4px solid #f3f3f3',
//           borderTop: '4px solid #3498db',
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite',
//         }}
//       />
//     </div>
//   )

//   const ErrorMessage = ({ message }) => (
//     <div
//       style={{
//         backgroundColor: '#fee2e2',
//         border: '1px solid #ef4444',
//         color: '#b91c1c',
//         padding: '1rem',
//         borderRadius: '6px',
//         margin: '1rem 0',
//       }}
//     >
//       <strong style={{ marginRight: '0.5rem' }}>Error:</strong>
//       <span>{message}</span>
//     </div>
//   )

//   const RefreshButton = () => (
//     <button
//       onClick={() => fetchProcessedData()}
//       disabled={isRefreshing}
//       style={{
//         backgroundColor: '#3498db',
//         color: 'white',
//         border: 'none',
//         padding: '0.5rem 1rem',
//         borderRadius: '6px',
//         cursor: isRefreshing ? 'not-allowed' : 'pointer',
//         opacity: isRefreshing ? 0.7 : 1,
//         transition: 'opacity 0.2s ease',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '0.5rem',
//       }}
//     >
//       <span
//         style={{
//           display: 'inline-block',
//           animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
//         }}
//       >
//         ↻
//       </span>
//       {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
//     </button>
//   )

//   if (loading && !isRefreshing) {
//     return <LoadingSpinner />
//   }

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
//       <div
//         style={{
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           padding: '1.5rem',
//           marginBottom: '2rem',
//           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         <h1
//           style={{
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//             color: '#1a1a1a',
//             margin: 0,
//           }}
//         >
//           Processing Statistics
//         </h1>
//         <RefreshButton />
//       </div>

//       {error && <ErrorMessage message={error} />}

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//           gap: '1.5rem',
//         }}
//       >
//         <StatCard
//           title="Email Processed Attachments"
//           value={processedData.history_email}
//           icon="📧"
//         />
//         <StatCard title="Manual Upload" value={processedData.history_file} icon="📁" />
//         <StatCard title="Total Processed Documents" value={processedData.history} icon="📊" />
//       </div>

//       <style>
//         {`
//           @keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//         `}
//       </style>
//     </div>
//   )
// }

// export default Dashboard

import React from 'react'
import { useGetDashboardDataQuery } from '../../app/service/uploadApiSlice'
import { CSpinner } from '@coreui/react'

const Dashboard = () => {
  const { data, error, isLoading, isFetching, refetch } = useGetDashboardDataQuery()

  const processedData = data?.data || {
    history_email: 0,
    history_file: 0,
    history: 0,
  }

  const StatCard = ({ title, value, icon }) => (
    <div
      className="stat-card"
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p
            style={{
              color: '#666',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              fontWeight: '500',
            }}
          >
            {title}
          </p>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: '0',
              color: '#1a1a1a',
            }}
          >
            {value.toLocaleString()}
          </h3>
        </div>
        <div
          style={{
            fontSize: '2rem',
            color: '#666',
            backgroundColor: '#f5f5f5',
            padding: '0.75rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  )

  // const LoadingSpinner = () => (
  //   <div
  //     style={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       minHeight: '400px',
  //     }}
  //   >
  //     <div
  //       style={{
  //         width: '48px',
  //         height: '48px',
  //         border: '4px solid #f3f3f3',
  //         borderTop: '4px solid #3498db',
  //         borderRadius: '50%',
  //         animation: 'spin 1s linear infinite',
  //       }}
  //     />
  //   </div>
  // )

  const ErrorMessage = ({ message }) => (
    <div
      style={{
        backgroundColor: '#fee2e2',
        border: '1px solid #ef4444',
        color: '#b91c1c',
        padding: '1rem',
        borderRadius: '6px',
        margin: '1rem 0',
      }}
    >
      <strong style={{ marginRight: '0.5rem' }}>Error:</strong>
      <span>{message}</span>
    </div>
  )

  const RefreshButton = () => (
    <button
      onClick={() => refetch()}
      disabled={isFetching}
      style={{
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: isFetching ? 'not-allowed' : 'pointer',
        opacity: isFetching ? 0.7 : 1,
        transition: 'opacity 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          animation: isFetching ? 'spin 1s linear infinite' : 'none',
        }}
      >
        ↻
      </span>
      {isFetching ? 'Refreshing...' : 'Refresh Data'}
    </button>
  )

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1a1a1a',
            margin: 0,
          }}
        >
          Processing Statistics
        </h1>
        <RefreshButton />
      </div>

      {error && <ErrorMessage message={error?.data?.message || 'Failed to load data'} />}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <StatCard
          title="Email Processed Attachments"
          value={processedData.history_email}
          icon="📧"
        />
        <StatCard title="Manual Upload" value={processedData.history_file} icon="📁" />
        <StatCard title="Total Processed Documents" value={processedData.history} icon="📊" />
      </div>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Dashboard
