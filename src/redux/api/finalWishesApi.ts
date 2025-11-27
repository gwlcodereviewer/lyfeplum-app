import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {
  IApiResponse,
  ICheckListApiResponse,
  IFinalCheckListApiResponse,
  IFinalWishApiResponse,
  IQuestionDetailsApiResponse,
  ISaveWishApiResponse,
  IUpdateFinalWishApiResponse,
} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: finalWishesApi
 * Desc: Function to manage final wishes API calls.
 */
export const finalWishesApi = createApi({
  reducerPath: REDUCER_PATHS.FinalWishes,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    getFinalWishes: builder.mutation<IFinalWishApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.getFinalWishes,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    updateFinalWishes: builder.mutation<IUpdateFinalWishApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.updateFinalWishes,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    finalWishCheckList: builder.mutation<IFinalCheckListApiResponse, {}>({
      query() {
        return {
          url: API_END_POINTS.finalWishCheckList,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    getCheckList: builder.mutation<ICheckListApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.getCheckList,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    getQuestionDetails: builder.mutation<IQuestionDetailsApiResponse, string>({
      query(data) {
        return {
          url: API_END_POINTS.questionDetails + data,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    saveWishes: builder.mutation<ISaveWishApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.saveFinalWishDetails,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    removeImage: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.removeUploadedImage,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    updateWishCheckList: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.updateWishCheckList,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    storeFinalWishesInfo: builder.mutation<IUpdateFinalWishApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.storeFinalWishesInfo,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    removeDocuments: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.removeDocuments,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetFinalWishesMutation,
  useUpdateFinalWishesMutation,
  useFinalWishCheckListMutation,
  useGetCheckListMutation,
  useGetQuestionDetailsMutation,
  useSaveWishesMutation,
  useRemoveImageMutation,
  useUpdateWishCheckListMutation,
  useStoreFinalWishesInfoMutation,
  useRemoveDocumentsMutation,
} = finalWishesApi;
