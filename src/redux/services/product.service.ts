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
          categories: product.categories[0],
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
        body: {
          code: body.code,
          name: body.name,
          characteristics: body.characteristics,
          price: body.price,
          company: body.company.id,
          categories: [body.categories.id]
        }
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: (body) => ({
        url: `/products/${body.id}/`,
        method: 'PUT',
        body: {
          code: body.code,
          name: body.name,
          characteristics: body.characteristics,
          price: body.price,
          company: body.company.id,
          categories: [body.categories.id]
        }
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = api;

export default api;
