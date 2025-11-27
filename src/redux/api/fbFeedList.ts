import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {IApiResponse, IFbFeedApiResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: mediaListApi
 * Desc: Function to manage mediaList API calls.
 */
export const fbFeedListApi = createApi({
  reducerPath: REDUCER_PATHS.fbFeedListApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    getFeedList: builder.mutation<IFbFeedApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.fbFeedList,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    connectFacebook: builder.mutation<{data: any}, any>({
      query(data) {
        return {
          url: API_END_POINTS.fbConnect,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    shareFbPost: builder.mutation<IApiResponse, any>({
      query(data) {
        return {
          url: API_END_POINTS.fbPostShare,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    removeFbPost: builder.mutation<IApiResponse, any>({
      query(data) {
        return {
          url: API_END_POINTS.fbPostRemove + data,
          method: REQUEST_METHODS.DELETE,
        };
      },
    }),
  }),
});

export const {
  useGetFeedListMutation,
  useConnectFacebookMutation,
  useShareFbPostMutation,
  useRemoveFbPostMutation,
} = fbFeedListApi;
