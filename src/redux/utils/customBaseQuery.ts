import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';

import { logout } from '../slices/auth.slice';
import type { RootState } from '../store';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_URL_API,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    if (accessToken !== null) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  }
});

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const adjustedUrl = `${import.meta.env.VITE_APP_URL_API}${
    typeof args === 'string' ? args : args.url
  }`;
  const adjustedArgs =
    typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };

  const result = await baseQuery(adjustedArgs, api, extraOptions);

  if (result?.error !== null && result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};
