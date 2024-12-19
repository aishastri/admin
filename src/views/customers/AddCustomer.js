import React, { useState } from 'react'
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap'
import { useAddCustomerMutation } from '../../app/service/customerSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddCustomerForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [addCustomer, { isLoading }] = useAddCustomerMutation()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await addCustomer(formData).unwrap()
      if (response.status === 'success') {
        toast.success('user added successfully')

        navigate('/customers') // Redirect to home page
      } else {
        setError('Failed to add customer. Please try again.')
      }
    } catch (err) {
      setError(err?.data?.message || 'An unexpected error occurred.')
    }
  }

  return (
    <Container
      className="mt-5"
      style={{
        opacity: isLoading ? 0.7 : 1, // Reduce opacity when status is changing
        pointerEvents: isLoading ? 'none' : 'auto', // Disable interactions
        transition: 'opacity 0.3s ease', // Smooth transition
      }}
    >
      <h2 className="mb-4">Add New Customer</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" /> : 'Submit'}
        </Button>
      </Form>
    </Container>
  )
}

export default AddCustomerForm
