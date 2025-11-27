import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {CRUD_ACTION_TYPES} from '../../helpers/constants';
import {IJustInCaseApiResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: Just In Case Api
 * Desc: Function to manage Just In Case API calls.
 */
export const justInCaseApi = createApi({
  reducerPath: REDUCER_PATHS.JustInCaseApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    justInCase: builder.mutation<IJustInCaseApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.justInCase,
          method: CRUD_ACTION_TYPES.GET,
        };
      },
    }),
  }),
});

export const {useJustInCaseMutation} = justInCaseApi;
