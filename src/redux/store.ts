import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {authApi} from './api/authApi';
import {changePasswordApi} from './api/changePasswordApi';
import {chapterApi} from './api/chapterApi';
import {designatedContactsApi} from './api/designatedContactsApi';
import {fbFeedListApi} from './api/fbFeedList';
import {finalWishesApi} from './api/finalWishesApi';
import {justInCaseApi} from './api/justInCaseApi';
import {lifeCelebrationApi} from './api/lifeCelebrationApi';
import {logoutApi} from './api/logoutApi';
import {mediaListApi} from './api/mediaList';
import {profileApi} from './api/profileApi';
import {subscriptionApi} from './api/subscriptionApi';
import subscriptionReducer from './api/subscriptionState';
import {traitsApi} from './api/traitsApi';
import userReducer from './api/userState';
import {awsApi} from './api/awsApi';
import uploadReducer from './api/uploadState';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [logoutApi.reducerPath]: logoutApi.reducer,
    [designatedContactsApi.reducerPath]: designatedContactsApi.reducer,
    [changePasswordApi.reducerPath]: changePasswordApi.reducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [traitsApi.reducerPath]: traitsApi.reducer,
    [finalWishesApi.reducerPath]: finalWishesApi.reducer,
    [justInCaseApi.reducerPath]: justInCaseApi.reducer,
    [mediaListApi.reducerPath]: mediaListApi.reducer,
    [lifeCelebrationApi.reducerPath]: lifeCelebrationApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [fbFeedListApi.reducerPath]: fbFeedListApi.reducer,
    [awsApi.reducerPath]: awsApi.reducer,
    subscription: subscriptionReducer,
    user: userReducer,
    upload: uploadReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      profileApi.middleware,
      logoutApi.middleware,
      designatedContactsApi.middleware,
      changePasswordApi.middleware,
      chapterApi.middleware,
      traitsApi.middleware,
      finalWishesApi.middleware,
      justInCaseApi.middleware,
      mediaListApi.middleware,
      lifeCelebrationApi.middleware,
      subscriptionApi.middleware,
      fbFeedListApi.middleware,
      awsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
