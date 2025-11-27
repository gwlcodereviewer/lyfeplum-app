import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import configs from '../../configs';
import {API_END_POINTS, REDUCER_PATHS} from '../../constants/server';
import {REQUEST_METHODS} from '../../helpers/constants';
import {
  IApiResponse,
  IFamilyUserApiResponse,
  IListingApiResponse,
} from '../../types/utils';
import {getApiHeader} from '../../utils';
const myGlobal: any = global;

/**
 * Name: subscriptionApi
 * Desc: Function to manage subscription API calls.
 */
export const subscriptionApi = createApi({
  reducerPath: REDUCER_PATHS.subscriptionApi,
  baseQuery: fetchBaseQuery({
    baseUrl: configs.baseUrl,
    prepareHeaders: headers => {
      return getApiHeader(headers);
    },
  }),
  endpoints: builder => ({
    getSubscriptionListing: builder.mutation<IListingApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.subscriptionListing,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    getFamilyUsers: builder.mutation<IFamilyUserApiResponse, string>({
      query() {
        return {
          url: API_END_POINTS.getFamilyUsers,
          method: REQUEST_METHODS.GET,
        };
      },
    }),
    addFamilyUser: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.addFamilyUser,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    updateInvitationMessage: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.updateInvitationMessage,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    createSubscription: builder.mutation<IApiResponse, {}>({
      query(data) {
        return {
          url: API_END_POINTS.createSubscription,
          method: REQUEST_METHODS.POST,
          body: data,
        };
      },
    }),
    updateSubscription: builder.mutation<IApiResponse, {}>({
      query(data) {
        if (!myGlobal.isCalling) {
          myGlobal.isCalling = true;
          setTimeout(() => {
            myGlobal.isCalling = false;
          }, 1000);
          return {
            url: API_END_POINTS.updateSubscription,
            method: REQUEST_METHODS.POST,
            body: data,
          };
        }
        return {
          url: '',
        };
      },
    }),
    updateIOSSubscription: builder.mutation<IApiResponse, {}>({
      query(data) {
        if (!myGlobal.isCalling) {
          myGlobal.isCalling = true;
          setTimeout(() => {
            myGlobal.isCalling = false;
          }, 1000);
          return {
            url: API_END_POINTS.updateIOSSubscription,
            method: REQUEST_METHODS.POST,
            body: data,
          };
        }
        return {
          url: '',
        };
      },
    }),
  }),
});

export const {
  useGetSubscriptionListingMutation,
  useAddFamilyUserMutation,
  useGetFamilyUsersMutation,
  useUpdateInvitationMessageMutation,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useUpdateIOSSubscriptionMutation,
} = subscriptionApi;
