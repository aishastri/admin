import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Spinner, Alert, Button } from 'react-bootstrap'
import { useGetAllCustomersQuery, useChangeStatusMutation } from '../../app/service/customerSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserList = () => {
  //const [users, setUsers] = useState([])
  //const [loading, setLoading] = useState(true)
  //const [error, setError] = useState(null)

  const { data, isLoading, isError, error, refetch } = useGetAllCustomersQuery()

  const [changeStatus, { isLoading: isChangingStatus, error: changeStatusError }] =
    useChangeStatusMutation()

  const navigate = useNavigate()

  function formatDate(isoTimestamp) {
    const date = new Date(isoTimestamp)

    const day = String(date.getDate()).padStart(2, '0') // Ensures 2-digit day
    const month = date.toLocaleString('en-US', { month: 'short' }) // Short month name
    const year = String(date.getFullYear()).slice(-2) // Last two digits of the year

    return `${day}-${month}-${year}`
  }
  useEffect(() => {
    // Fetch users from the backend
    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:5000/api/v1/customers/getAllCustomers', {
    //       withCredentials: true, // Include credentials
    //     })
    //     if (response.data.status === 'success') {
    //       setUsers(response.data.data)
    //     } else {
    //       setError('Failed to load users. Invalid response structure.')
    //     }
    //   } catch (err) {
    //     setError('Failed to load users. Please try again later.')
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchUsers()
    refetch()
  }, [])

  const handleAddCustomer = () => {
    navigate('/customers/addCustomer')
    // Logic for adding a new customer
    // alert('Add Customer Clicked!')
  }

  const handleViewCustomer = (id) => {
    // Logic for changing the status of a user
    navigate(`/customers/${id}`)
    //alert(`Change Status Clicked for User ID: ${id}`)
  }

  const handleSuspendCustomer = async (id, status) => {
    console.log(id, status)
    try {
      // Toggle the current status
      //const newStatus = !status
      await changeStatus({ id, isActive: !status }).unwrap()
      toast.success(`Status changed successfully to ${status ? 'InActive' : 'Active'}`)
      //alert(`Status changed successfully to ${status ? 'Active' : 'Inactive'}`)
      refetch() // Refresh the user data after the mutation
    } catch (err) {
      toast.error(err?.data.error.message)
      console.log('Failed to change status:', err)
      // }
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  // if (error) {
  //   return <Alert variant="danger">{error}</Alert>
  // }
  if (isError) {
    return (
      <div>
        <Alert variant="danger">
          Failed to load users. {error?.data?.message || 'Please try again later.'}
        </Alert>
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={refetch}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  console.log(data)

  const users = data?.data || []

  return (
    <div className="container my-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of Users</h2>
        <Button variant="primary" onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isActive ? 'Active' : 'Suspended'}</td>
                <td>{formatDate(user?.createdAt)}</td>
                <td>
                  <Button
                    variant="warning"
                    className="mx-2"
                    size="sm"
                    onClick={() => handleViewCustomer(user._id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleSuspendCustomer(user._id, user.isActive)}
                  >
                    {user.isActive ? 'Suspend' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
