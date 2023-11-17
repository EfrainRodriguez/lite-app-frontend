import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_URL_API}`
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/token/',
        method: 'POST',
        body
      }),
      transformResponse: (response: { access: string }) => {
        return { accessToken: response.access };
      },
      invalidatesTags: ['Auth']
    }),
    getAccount: builder.query({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: 'GET'
      }),
      providesTags: ['Auth']
    })
  })
});

export const { useLoginMutation, useGetAccountQuery } = api;

export default api;
