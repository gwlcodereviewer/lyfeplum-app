import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {ISignedUrlResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: awsApi
 * Desc: Function to manage the aws api calls
 */
export const awsApi = createApi({
  reducerPath: REDUCER_PATHS.awsApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    getSignedUrl: builder.mutation<ISignedUrlResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.getSignedUrl,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
  }),
});

export const {useGetSignedUrlMutation} = awsApi;
