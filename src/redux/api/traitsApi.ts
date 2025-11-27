import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {getApiHeader} from '../../utils';
import {CRUD_ACTION_TYPES} from '../../helpers/constants';
import configs from '../../configs';
import {ITraitsApiResponse} from '../../types/utils';

/**
 * Name: Traits List Api
 * Desc: Function to manage Traits API calls.
 */
export const traitsApi = createApi({
  reducerPath: REDUCER_PATHS.TraitsApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    traitsListApi: builder.mutation<ITraitsApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.traitsList,
          method: CRUD_ACTION_TYPES.GET,
        };
      },
    }),
    addTraitsApi: builder.mutation<{data: any}, any>({
      query(data) {
        return {
          url: API_END_POINTS.addTraits,
          method: CRUD_ACTION_TYPES.POST,
          body: data,
        };
      },
    }),
  }),
});

export const {useTraitsListApiMutation, useAddTraitsApiMutation} = traitsApi;
