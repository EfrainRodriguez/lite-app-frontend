import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_URL_API}`
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/token/',
        method: 'POST',
        body
      }),
      transformResponse: (response: { access: string }) => {
        return { accessToken: response.access };
      }
    })
  })
});

export const { useLoginMutation } = api;

export default api;
