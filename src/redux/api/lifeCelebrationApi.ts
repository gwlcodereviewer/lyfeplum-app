import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {CRUD_ACTION_TYPES} from '../../helpers/constants';
import {IApiResponse, ILifeCelebrationApiResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: Life Celebration Api
 * Desc: Function to manage Life Celebration API calls.
 */
export const lifeCelebrationApi = createApi({
  reducerPath: REDUCER_PATHS.lifeCelebrationApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    lifeCelebrationListApi: builder.mutation<
      ILifeCelebrationApiResponse,
      string
    >({
      query() {
        return {
          url: API_END_POINTS.lifeCelebrationList,
          method: CRUD_ACTION_TYPES.GET,
        };
      },
    }),
    updateLifeCelebrationApi: builder.mutation<IApiResponse, any>({
      query(data) {
        return {
          url: API_END_POINTS.updateLifeCelebration,
          method: CRUD_ACTION_TYPES.POST,
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLifeCelebrationListApiMutation,
  useUpdateLifeCelebrationApiMutation,
} = lifeCelebrationApi;
