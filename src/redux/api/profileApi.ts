import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {IApiResponse, IUserApiResponse} from '../../types/utils';
import {getApiHeader} from '../../utils';

/**
 * Name: profileApi
 * Desc: Function to manage profile API calls.
 */
export const profileApi = createApi({
  reducerPath: REDUCER_PATHS.ProfileAPI,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    userProfile: builder.mutation<IUserApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.userProfile,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    editProfile: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.editProfile,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    profileImage: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.profileImage,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    coverImage: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.coverImage,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    deleteProfile: builder.mutation<IApiResponse, {}>({
      query() {
        return {
          url: API_END_POINTS.deleteAccount,
          method: REQUEST_METHODS.DELETE,
        };
      },
    }),
  }),
});

export const {
  useUserProfileMutation,
  useProfileImageMutation,
  useCoverImageMutation,
  useEditProfileMutation,
  useDeleteProfileMutation,
} = profileApi;
