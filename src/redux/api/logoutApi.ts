import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {CRUD_ACTION_TYPES} from '../../helpers/constants';
import {IApiResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: logoutApi
 * Desc: Function to manage logout API calls.
 */
export const logoutApi = createApi({
  reducerPath: REDUCER_PATHS.LogoutApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    logoutUser: builder.mutation<IApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.logout,
          method: CRUD_ACTION_TYPES.GET,
        };
      },
    }),
  }),
});

export const {useLogoutUserMutation} = logoutApi;
