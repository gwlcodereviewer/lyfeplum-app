import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {CRUD_ACTION_TYPES} from '../../helpers/constants';
import {IApiResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: Change Password Api
 * Desc: Function to manage profile API calls.
 */
export const changePasswordApi = createApi({
  reducerPath: REDUCER_PATHS.ChangePasswordAPI,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    changePassword: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.changePassword,
          method: CRUD_ACTION_TYPES.POST,
          body: data,
        };
      },
    }),
  }),
});

export const {useChangePasswordMutation} = changePasswordApi;
