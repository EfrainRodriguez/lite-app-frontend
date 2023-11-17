import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from '../utils/customBaseQuery';

const api = createApi({
  reducerPath: 'productApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryString) => ({
        url: `/products?${queryString}`,
        method: 'GET'
      }),
      providesTags: ['Product'],
      transformResponse: (response: any[]) => {
        return response.map((product) => ({
          ...product,
          createdAt: product.createdAt
        }));
      }
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/products/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: (body) => ({
        url: '/products/',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation
} = api;

export default api;
