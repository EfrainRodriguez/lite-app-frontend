import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from '../utils/customBaseQuery';

const api = createApi({
  reducerPath: 'categoryApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (queryString) => ({
        url: `/categories?${queryString}`,
        method: 'GET'
      }),
      providesTags: ['Category'],
      transformResponse: (response: any[]) => {
        return response.map((category) => ({
          ...category,
          createdAt: category.createdAt
        }));
      }
    })
  })
});

export const { useGetCategoriesQuery } = api;

export default api;
