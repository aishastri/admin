// src/app/service/usersApiSlice.js

import { apiSlice } from './apiSlice'

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (formData) => ({
        url: '/api/v1/upload',
        method: 'POST',
        body: formData,
      }),
    }),

    getHistory: builder.mutation({
      query: () => ({
        url: '/api/v1/upload',
        method: 'GET',
      }),
    }),

    getSingleHistory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/upload/${id}`,
        method: 'GET',
      }),
    }),

    getDashboardData: builder.query({
      query: () => ({
        url: `/api/v1/upload/processed-documents`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useUploadMutation,
  useGetHistoryMutation,
  useGetSingleHistoryMutation,
  useGetDashboardDataQuery,
} = uploadApiSlice
