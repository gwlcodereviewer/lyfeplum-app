import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {
  IAddContactApiResponse,
  IApiResponse,
  IContactsApiResponse,
} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: designatedContactsApi
 * Desc: Function to manage designated contacts API calls.
 */
export const designatedContactsApi = createApi({
  reducerPath: REDUCER_PATHS.DesignatedContactsAPI,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    getDesignatedContacts: builder.mutation<IContactsApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.designatedContacts,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    addDesignatedContacts: builder.mutation<IAddContactApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.addDesignatedContacts,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    updateDesignatedContacts: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.updateDesignatedContacts,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    deleteDesignatedContacts: builder.mutation<IApiResponse, null>({
      query(data) {
        return {
          url: API_END_POINTS.deleteDesignatedContacts + data,
          method: REQUEST_METHODS.DELETE,
        };
      },
    }),
  }),
});

export const {
  useGetDesignatedContactsMutation,
  useAddDesignatedContactsMutation,
  useUpdateDesignatedContactsMutation,
  useDeleteDesignatedContactsMutation,
} = designatedContactsApi;
