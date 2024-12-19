import React, { useEffect } from 'react'
import { Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { useGetCustomerQuery, useChangeStatusMutation } from '../../app/service/customerSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const UserDetails = () => {
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useGetCustomerQuery(id)

  const [changeStatus, { isLoading: isChangingStatus, error: changeStatusError }] =
    useChangeStatusMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">Failed to load user data. Please try again later.</Alert>
  }

  console.log(data)

  const user = data?.data

  const handleChangeStatus = async () => {
    try {
      const newStatus = !user.isActive // Toggle the current status
      await changeStatus({ id, isActive: newStatus }).unwrap()
      toast.success(`Status changed successfully to ${!newStatus ? 'InActive' : 'Active'}`)

      //alert(`Status changed successfully to ${newStatus ? 'Active' : 'Inactive'}`)
      refetch() // Refresh the user data after the mutation
    } catch (err) {
      toast.error(err?.data.error.message)
      console.error('Failed to change status:', err)
    }
    // Logic for changing the user's status
    //alert(`Change Status clicked for User ID: ${userId}`)
  }

  return (
    <div className="container my-2">
      <h2>User Details</h2>
      {user ? (
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>ID:</strong> {user._id}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {user.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Name:</strong> {user.name || 'N/A'}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email Configuration:</strong>
                {user.emailConfigurations ? (
                  <div className="mt-2">
                    <div>Provider: {user.emailConfigurations.provider}</div>
                    <div>IsActive: {user.emailConfigurations.provider ? 'True' : 'False'}</div>
                    {/* <div>GrantId: {user.emailConfigurations.grantId}</div> */}
                    {/* <div>Port: {user.emailConfigurations.port}</div> */}
                    <div>
                      Last Synced:{' '}
                      {user.emailConfigurations.lastSyncedAt
                        ? new Date(user.emailConfigurations.lastSyncedAt).toLocaleString()
                        : 'Never'}
                    </div>
                  </div>
                ) : (
                  <div className="text-muted">Not Configured Yet</div>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Active:</strong> {user.isActive ? 'Yes' : 'No'}
              </ListGroup.Item>
            </ListGroup>
            <Button variant="warning" className="mt-3" onClick={() => handleChangeStatus(user._id)}>
              Change Status
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">No user data available.</Alert>
      )}
    </div>
  )
}

export default UserDetails
