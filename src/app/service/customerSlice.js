import { apiSlice } from './apiSlice'

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => ({
        url: '/api/v1/customers/getAllCustomers',
        method: 'GET',
      }),
    }),
    addCustomer: builder.mutation({
      query: (formData) => ({
        url: '/api/v1/customers/createCustomer',
        method: 'POST',
        body: formData,
      }),
    }),
    getCustomer: builder.query({
      query: (id) => ({
        url: `/api/v1/customers/${id}`,
        method: 'GET',
      }),
    }),
    changeStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/api/v1/customers/updateStatus/${id}`,
        method: 'PATCH',
        body: { isActive },
      }),
    }),
  }),
})

export const {
  useGetAllCustomersQuery,
  useAddCustomerMutation,
  useGetCustomerQuery,
  useChangeStatusMutation,
} = customersApiSlice
