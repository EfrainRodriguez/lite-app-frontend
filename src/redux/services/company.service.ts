import { createApi } from '@reduxjs/toolkit/query/react';

import { Company } from '../../models/company.model';
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
        url: '/companies/',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Company']
    })
  })
});

export const {
  useGetCompanyQuery,
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation
} = api;

export default api;
