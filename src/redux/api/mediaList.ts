import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {IApiResponse, IMediaApiResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: mediaListApi
 * Desc: Function to manage mediaList API calls.
 */
export const mediaListApi = createApi({
  reducerPath: REDUCER_PATHS.MediaListAPI,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    getMediaList: builder.mutation<IMediaApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.mediaList,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    addNewMedia: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.addNewMedia,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    loadMoreMedia: builder.mutation<IMediaApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.loadMoreMedia,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetMediaListMutation,
  useAddNewMediaMutation,
  useLoadMoreMediaMutation,
} = mediaListApi;
