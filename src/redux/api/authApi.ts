import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {
  IApiResponse,
  ILoginApiResponse,
  IRegisterApiResponse,
} from '../../types/utils';

/**
 * Name: authApi
 * Desc: Function to manage authentication API calls.
 */
export const authApi = createApi({
  reducerPath: REDUCER_PATHS.AuthApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
  }),
  endpoints: builder => ({
    loginUser: builder.mutation<ILoginApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.login,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    registerUser: builder.mutation<IRegisterApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.registerUser,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.forgotPassword,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    socialLogin: builder.mutation<IRegisterApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.socialLogin,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    resendUserVerificationEmail: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.resendEmail,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useSocialLoginMutation,
  useResendUserVerificationEmailMutation,
} = authApi;
