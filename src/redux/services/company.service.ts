import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from '../utils/customBaseQuery';

const api = createApi({
  reducerPath: 'companyApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Company'],
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: (queryString) => ({
        url: `/companies?${queryString}`,
        method: 'GET'
      }),
      providesTags: ['Company'],
      transformResponse: (response: any[]) => {
        return response.map((company) => ({
          ...company,
          createdAt: company.createdAt
        }));
      }
    }),
    getCompany: builder.query({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'GET'
      }),
      providesTags: ['Company']
    }),
    createCompany: builder.mutation({
      query: (body) => ({
        url: '/companies/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Company']
    }),
    updateCompany: builder.mutation({
      query: (body) => ({
        url: `/companies/${body.id}/`,
        method: 'PUT',
        body: {
          name: body.name,
          nit: body.nit,
          address: body.address,
          phone: body.phone
        }
      }),
      invalidatesTags: ['Company']
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Company']
    })
  })
});

export const {
  useGetCompanyQuery,
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation
} = api;

export default api;
