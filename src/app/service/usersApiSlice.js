// src/app/service/usersApiSlice.js

import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    forgot: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/forgot',
        method: 'POST',
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/logout',
        method: 'GET', // The backend defines the logout as a GET request
      }),
    }),

    reset: builder.mutation({
      query: ({ password, token }) => ({
        url: `/api/v1/auth/reset/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/profile',
        method: 'PUT',
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/updatePassword',
        method: 'PUT',
        body: data,
      }),
    }),

    getUser: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/getMe',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotMutation,
  useLogoutUserMutation,
  useResetMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useGetUserMutation,
} = userApiSlice
